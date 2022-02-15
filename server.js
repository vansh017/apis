const express = require('express')
const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cloudinary = require('cloudinary')

process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down the server due to Uncaught Exception`)
  process.exit(1)
})

dotenv.config()

//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('db connected '))
  .catch((err) => console.log(err))

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
})

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`)
})

//unhandled promise
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down the server due to Unhandled Promise Rejection`)

  server.close(() => {
    process.exit(1)
  })
})
// process.on
