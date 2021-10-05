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
  console.log(printFavourite)
  return printFavourite
}
  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
  }