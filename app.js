const cookieParser = require('cookie-parser')
const express = require('express')

const app = express()

const errorMiddleware = require('./middleware/error')

app.use(express.json())
app.use(cookieParser())

const product = require('./routes/ProductRoutes')
const user = require('./routes/UserRoutes')
const order = require('./routes/OrderRoutes')

app.use('/api', product)
app.use('/api', user)
app.use('/api', order)

// middleware for error
app.use(errorMiddleware)

module.exports = app
