const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const favourite = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  const printFavourite = {
    title: favourite.title,
    author: favourite.author,
    likes: favourite.likes
  }
  return printFavourite
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(b => b.author)

  const blogsPerAuthor = _.values(_.groupBy(authors)).map(a => ({ author: a[0], blogs: a.length }))
  const result = blogsPerAuthor.reduce((prev, current) => (prev.blogs > current.blogs) ? prev : current)

  return result
}

const mostLikes = (blogs) => {
  const result = blogs.reduce((authorsLikes, object) => {
    authorsLikes[object.author] = authorsLikes[object.author] || []
    authorsLikes[object.author].push(
      object.likes
    )
    return authorsLikes
  }, {})

  const entries = Object.entries(result)

  const mapped = entries.map(line => ([line[0], _.sum(line[1])]))
  const mostLikes = mapped.reduce((prev, current) => (prev[1] > current[1]) ? prev : current)
  const printResult = {
    author: mostLikes[0],
    likes: mostLikes[1]
  }
  return printResult
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}