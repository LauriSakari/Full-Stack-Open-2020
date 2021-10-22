const express = require('express')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')
const { errorHandler, requestLogger, unknownEndpoint, tokenExtractor, userExtractor } = require('./utils/middleware')


logger.info('connecting to ', config.mongoUrl)

mongoose.connect(config.mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use('/api/login', loginRouter)
app.use('/api/blogs', tokenExtractor, userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use(errorHandler)
app.use(unknownEndpoint)

module.exports = app