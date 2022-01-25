const express = require('express')
const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('db connected '))
  .catch((err) => console.log(err))

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`)
})

//unhandled promise
// process.on
