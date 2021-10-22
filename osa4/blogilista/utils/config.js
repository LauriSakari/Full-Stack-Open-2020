require('dotenv').config()

let PORT = process.env.PORT

const mongoUrl = process.env.NODE_ENV === 'test'
  ? process.env.test_mongoUrl
  : process.env.mongoUrl

module.exports = {
  mongoUrl,
  PORT
}