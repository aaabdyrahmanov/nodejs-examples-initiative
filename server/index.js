const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()

// CORS config
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200, 
    methods: ['GET'],
    allowedHeaders: [
      'Accept',
      'Content-Type'
    ]
  })
)

// security headers middleware
app.use(helmet())

// request body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// HTTP request logger middleware
app.use(morgan('dev'))

// compacting requests using GZIP middleware
app.use(compression())


module.exports = app
