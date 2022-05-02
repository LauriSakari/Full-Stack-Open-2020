const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const mongoUri = process.env.MONGODB_URI

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

mongoose.connect(mongoUri)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

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

const typeDefs = gql`

  type Author {
    name: String!
    born: Int
    id: ID! 
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
    me: User
  }
  
  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book
    addAuthor(
      name: String!
      born: Int
      bookCount: Int
    ): Author
    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

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

        return Book.find({}).populate('author')
      },
      allAuthors: async () => Author.find({})
      },

  Author: {
    bookCount: async (root) => {
        const filteredBooks = await Book.find({ author: root._id})
        return filteredBooks.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const suggestedAuthor = args.author
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const existingAuthor = await Author.findOne({ 'name': suggestedAuthor });

      if (!existingAuthor) {
        const author = await new Author({ name: suggestedAuthor })
        try {
          await author.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }
        const book = new Book({ ...args, author: author._id })
        try {
          await book.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }
        return book.populate('author')
      }
      const book = new Book({ ...args, author: existingAuthor._id })
      try {
        await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
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
    }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})