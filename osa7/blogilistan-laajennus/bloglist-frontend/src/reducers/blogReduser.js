
const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'GET_INITIAL_BLOGS':
    return action.data

  case 'NEW_BLOG': {
    const newBlog = action.data
    return [...state, newBlog]
  }

  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data)

  case 'ADD_LIKE': {
    const id = action.data.blogId
    const newLikes = action.data.likes
    const blogToChange = state.find(blog => blog.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: newLikes
    }
    const stateWithAddedLike = state.map(blog =>
      blog.id !== id ? blog : changedBlog)
    return state = stateWithAddedLike.sort((a, b) => b.likes - a.likes)
  }

  case 'ADD_COMMENT': {
    const id = action.data.blogId
    const newComment = action.data.newComment
    const blogToChange = state.find(blog => blog.id === id)

    const changedBlog = { ...blogToChange,
      comments: blogToChange.comments.concat(newComment) }

    return state.map(blog =>
      blog.id !== id ? blog : changedBlog)
  }

  default:
    return state
  }
}

export const initialBlogs = (blogs) => {
  return {
    type: 'GET_INITIAL_BLOGS',
    data: blogs
  }
}

export const addNewBlog = (newBlog) => {
  return {
    type: 'NEW_BLOG',
    data: newBlog
  }
}

export const remove = (blog) => {
  return {
    type: 'REMOVE_BLOG',
    data: blog
  }
}

export const addLike = ( blogId, likes ) => {
  return {
    type: 'ADD_LIKE',
    data: { blogId, likes }
  }
}

export const createComment = ( newComment, blogId ) => {
  return {
    type: 'ADD_COMMENT',
    data: { newComment, blogId }
  }
}

export default blogReducer