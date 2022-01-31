
const usersReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_USERS':
    return state = action.data

  case 'ADD_BLOG_FOR_USER': {
    const blogToAdd = action.data.blogToAdd
    const userId = action.data.userId
    const userToChange = state.find(user => user.id === userId )
    const changedUser = {
      ...userToChange,
      blogs: userToChange.blogs.concat(blogToAdd)
    }

    return state.map(user => user.id !== userId ? user : changedUser)
  }

  case 'REMOVE_BLOG_FROM_USER': {
    const userId = action.data.userId
    const blogId = action.data.blogId
    const userToChange = state.find(user => user.id === userId )
    const changedUser = {
      ...userToChange,
      blogs: userToChange.blogs.filter(blog => blog.id !== blogId)
    }

    return state.map(user => user.id !== userId ? user : changedUser)
  }

  default:
    return state
  }
}

export const setUsers = (users) => {
  return {
    type: 'SET_USERS',
    data: users
  }
}

export const addBlogForUser = newBlog => {
  const blogToAdd = {
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url,
    likes: newBlog.likes,
    id: newBlog.id
  }
  const userId = newBlog.user.id

  return {
    type: 'ADD_BLOG_FOR_USER',
    data: { blogToAdd, userId }
  }
}

export const removeBlogFromUser = (blogId, userId) => {
  return {
    type: 'REMOVE_BLOG_FROM_USER',
    data: { blogId, userId }
  }
}

export default usersReducer