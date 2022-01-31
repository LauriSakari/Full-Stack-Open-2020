const router = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

router.get('/:id/comments', async (request, response) => {
  const comments = await Comment
    .find({})
  response.json(comments)
})

router.post('/:id/comments', async (request, response) => {
  const comment = new Comment(request.body)
  const savedComment = await comment.save()

  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(savedComment.id)
  await blog.save()

  response.status(201).json(savedComment)
})

module.exports = router