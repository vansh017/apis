const res = require('express/lib/response')
const Request = require('../models/RequestModels')
const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require('../middleware/errorHandler')

const { checkUser } = require('../middleware/auth')

//create request

exports.createRequest = catchAsyncError(async (req, res, next) => {
  req.body.userId = req.user.id
  req.body.userName = req.user.name

  const request = await Request.create(req.body)

  res.status(201).json({
    success: true,
    request,
  })
})

//get requests

exports.getAllRequests = catchAsyncError(async (req, res) => {
  const requests = await Request.find()

  res.status(200).json({
    success: true,
    requests,
  })
})

//update requests

exports.updateRequest = catchAsyncError(async (req, res, next) => {
  let request = await Request.findById(req.params.id)

  if (!request) {
    return next(new ErrorHandler('request not found', 404))
  }
  request = await Request.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    request,
  })
})

//delete request

exports.deleteRequest = catchAsyncError(async (req, res, next) => {
  const request = await Request.findById(req.params.id)

  if (!request) {
    return next(new ErrorHandler('request not found', 404))
  }

  await request.remove()

  res.status(200).json({
    success: true,
    message: 'Request Deleted successfully',
  })
})
