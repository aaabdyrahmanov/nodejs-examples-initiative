// import environment variables
require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
const HOST = process.env.HOST
const PORT = process.env.PORT
const NODEJS_VERSIONS_API = process.env.NODEJS_VERSIONS_API

module.exports = {
  NODE_ENV,
  HOST,
  PORT,
  NODEJS_VERSIONS_API
}