const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require('../middleware/errorHandler')
const sendToken = require('../middleware/jwtToken')
const User = require('../models/UserModels')

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body

  const user = await User.create({
    name,
    email,
    password,
  })
  sendToken(user, 201, res)
})

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new ErrorHandler('Please provide Email and Password', 401))
  }

  const user = await User.findOne({ email }).select('+password')

  if (!user) return next(new ErrorHandler('Invalid email or password'))

  const checkPassword = user.comparePassword(password)
  console.log(checkPassword)

  if (!checkPassword)
    return next(new ErrorHandler('invalid email or password', 401))

  sendToken(user, 200, res)
})

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
  })

  res.status(200).json({
    success: true,
    message: 'logged out',
  })
})
