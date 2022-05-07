const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const author = require('./models/author')
const { db } = require('./models/author')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const getAuthorIdByName = async (authorName) => {
    const authorsArray = await Author.find({ author: authorName })
    if (authorsArray.length > 1) {
      const author = authorsArray.find(author => author.name === authorName)
      return author._id
    }
    return authorName._id
  }
  
  const filterByAuthor = async (author) => { 
      const authorId = await getAuthorIdByName(author)
      const booksArray = await Book.find({ author: authorId }).populate('author')
      return booksArray
  }
  
  const filterByGenre = async (genre) => {
    const booksArrayByGenre = await Book.find({ genres: { $in: [ genre ] } }).populate('author')
    return booksArrayByGenre
  }

  const resolvers = {
    Query: {
      me: (root, args, context) => {
        return context.currentUser
     },
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async() => Author.collection.countDocuments(),
        allBooks: async (root, args ) => {
          if (args.author && args.genre) {
             const filteredByGenre = await filterByGenre(args.genre)
             const result = filteredByGenre.filter(document => document.author.name === args.author)
             return result
           }
  
          if (args.author) {
            return filterByAuthor(args.author) 
          }
  
          if (args.genre) {
            return filterByGenre(args.genre)
           }
          const allbooks = Book.find({}).populate('author')
           return allbooks
        },
        allAuthors: async () => { 
          return await Author.find({}).populate('authorsBooks')
        }
        },
  
    Author: {
      bookCount: async (root) => {
          return root.authorsBooks.length
      }
    },
    Mutation: {
      addBook: async (root, args, context) => {
        const suggestedAuthor = args.author
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
        const existingAuthor = await Author.findOne({ 'name': suggestedAuthor })
        if (!existingAuthor) {
          const author = await new Author({ name: suggestedAuthor })
          const book = await new Book({ ...args, author: author._id })
          author.authorsBooks = [book._id]
        try {
          await book.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }
        try {
          await author.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
          })
        }
          pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') })
        
          return book.populate('author')
        }
        const book = await new Book({ ...args, author: existingAuthor._id })
        const author = await Author.findOne({ _id: existingAuthor._id})
        
        author.authorsBooks.push(book._id) 
        try {
          await book.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }
        try {
          await author.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }
          pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') })

        return book.populate('author')
      },
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new AuthenticationError('not authenticated')
        }
      const author = await Author.findOne({ name: args.name})
        if (!author) {
          return null
        }
        author.born = args.setBornTo
        try {
        await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      return author
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
    
        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
        if ( !user || args.password !== 'secret' ) {
          throw new UserInputError("wrong credentials")
        }
    
        const userForToken = {
          username: user.username,
          favoriteGenre: user.favoriteGenre,
          id: user._id,
        }
   
        const token = { value: jwt.sign(userForToken, JWT_SECRET)}
        return token
        }
      },
      Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
      },
  }

  module.exports = resolvers