const cookieParser = require('cookie-parser')
const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const app = express()

const errorMiddleware = require('./middleware/error')

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

const product = require('./routes/ProductRoutes')
const user = require('./routes/UserRoutes')
const order = require('./routes/OrderRoutes')
const request = require('./routes/RequestRoutes')

app.use('/api', product)
app.use('/api', user)
app.use('/api', order)
app.use('/api', request)

// middleware for error
app.use(errorMiddleware)

module.exports = app
