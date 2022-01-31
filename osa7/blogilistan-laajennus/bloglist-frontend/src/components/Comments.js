import React from 'react'
import { useDispatch } from 'react-redux'
import commentService from '../services/comments'
import { createComment } from '../reducers/blogReduser'

const Comments = ({ blog }) => {

  const dispatch = useDispatch()

  const addComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    const blogId = blog.id
    const newComment = await commentService.addNew({ comment, blogId })
    dispatch(createComment( newComment, blogId ))
  }

  if (!blog.comments) {
    return (
      <div>
        <h2>Comments</h2>
        <form onSubmit={addComment}>
          <input name='comment'>
          </input>
          <button type='submit'>add comment</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={addComment}>
        <input name='comment'>
        </input>
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment =>
          <li key={comment.id} > {comment.content} </li>)}
      </ul>
    </div>
  )}

export default Comments