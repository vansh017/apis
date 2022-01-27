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

//for upadte delete product by user who added
// exports.checkUser = (product) => {
//   return (req, res, next) => {
//     if (!product.userId === res.user.id) new ErrorHandler('not valid user', 400)
//     next()
//   }
// }
