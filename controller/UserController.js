const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require('../middleware/errorHandler')
const sendToken = require('../middleware/jwtToken')
const User = require('../models/UserModels')
const sendEmail = require('../middleware/sendEmail')
const crypto = require('crypto')
const { send } = require('express/lib/response')

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

  const checkPassword = await user.comparePassword(password)

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

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user) return next(new ErrorHandler('User not found', 404))

  const resetToken = user.getResetPasswordToken()

  await user.save({ validateBeforeSave: false })

  const resetPassUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/password/reset/${resetToken}`

  const message = `Your password reset token is \n\n ${resetPassUrl} \n\n `

  try {
    await sendEmail({
      email: user.email,
      subject: 'WorthIT password reset',
      message,
    })

    res.status(200).json({
      success: true,
      message: `mail sent to ${user.email} successfully`,
    })
  } catch (err) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })
    return next(new ErrorHandler(err.message, 500))
  }
})

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })

  if (!user)
    return next(
      new ErrorHandler('reset password token is invalid or expire', 400)
    )

  if (req.body.password !== req.body.confirmPassword)
    return next(new ErrorHandler('password does not match', 400))

  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()
  sendToken(user, 200, res)
})

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    user,
  })
})

exports.updatePass = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  const checkPassword = await user.comparePassword(req.body.oldPassword)

  if (!checkPassword) return next(new ErrorHandler('invalid  password', 401))

  if (req.body.newPassword !== req.body.confirmNewPassword)
    return next(new ErrorHandler('Password does not match', 401))

  user.password = req.body.newPassword
  await user.save()
  sendToken(user, 200, res)
})

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    department: req.body.department,
  }

  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    user,
  })
})