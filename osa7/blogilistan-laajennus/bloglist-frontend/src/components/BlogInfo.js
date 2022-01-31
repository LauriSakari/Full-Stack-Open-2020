import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Comments from './Comments'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { addLike, remove } from '../reducers/blogReduser'
import { setNotification, removeNotification, setSuccessNotification } from '../reducers/notificationReducer'
import { removeBlogFromUser } from '../reducers/usersReducer'

const BlogInfo = ({ blogs }) => {

  if (!blogs[0] || blogs.length === 0 || blogs === null) {
    return null
  }

  const dispatch = useDispatch()
  const history = useHistory()

  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  if (!blog) {
    return null
  }

  const handleAddLike = async (likedBlog) => {
    try {
      const response = await blogService.addLike(likedBlog)
      dispatch(addLike(response.id, response.likes))
    }
    catch(exeption){
      dispatch(setNotification(`something went wrong while adding your like to server: ${exeption} `))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }

  const handleRemoveBlog = async (blogId) => {
    try{
      await blogService.removeBlog(blogId)
      history.push('/')
      dispatch(remove(blogId))
      dispatch(removeBlogFromUser(blogId, blog.user.id))
      dispatch(setSuccessNotification('blog was succesfully removed'))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
    catch(exeption){
      dispatch(setNotification(`something went wrong while removing the blog ${exeption}`))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }

  const like = (likedBlog) => {
    const newLikes = likedBlog.likes + 1

    handleAddLike({
      blogId: likedBlog.id,
      user: likedBlog.user,
      likes: newLikes,
      author: likedBlog.author,
      title: likedBlog.title,
      url: likedBlog.url
    })
  }

  const removeBlog = (blogId) => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {

      handleRemoveBlog(blogId)
    }
  }
  const showRemoveButton = (username) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    const user = JSON.parse(loggedUserJSON)
    if (username === user.username) {
      return(
        <div>
          <button id='removeButton' type='button' className='btn btn-danger' onClick={ () => removeBlog(blog.id)}>remove</button>
        </div>
      )
    }
  }


  return(
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}> {blog.url} </a> {<br/>}
      {blog.likes} likes <button id='likeButton' onClick={ () => like(blog)}>like</button>{<br/>}
      Added by {blog.user.name}
      {showRemoveButton(blog.user.username)}
      <Comments blog={blog}/>
    </div>
  )
}

export default BlogInfo