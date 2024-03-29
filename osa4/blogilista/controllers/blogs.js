const blogsRouter = require('express').Router()
const { response } = require('../app')
require('mongoose-unique-validator')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { error } = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? body.likes = 0 : body.likes,
    user: user._id
  })
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog.toJSON())
  } catch(exeption) {
    next(exeption)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete.user || request.user.toString() !== blogToDelete.user.toString()) {
    return response.status(401).json({ error: 'you are not authorized to remove this blog' })
  }
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exeption) {
    next(exeption)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    likes: body.likes
  }
  try {
    const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedNote.toJSON())
  } catch(exeption) {
    next(exeption)
  }
})


module.exports = blogsRouter