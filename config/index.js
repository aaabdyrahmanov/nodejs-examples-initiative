// import environment variables
require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
const HOST = process.env.HOST
const PORT = process.env.PORT

module.exports = {
  NODE_ENV,
  HOST,
  PORT
}