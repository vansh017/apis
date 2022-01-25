const catchAsyncError = require('./catchAsyncError')
const ErrorHandler = require('./errorHandler')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModels')

exports.isAuthUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return next(new ErrorHandler('please login', 401))
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET)
  //   console.log(decodeData)

  req.user = await User.findById(decodeData.id)

  next()
})

exports.checkUser = catchAsyncError(async (req, res, next) => {})
