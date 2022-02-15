const Notification = require('../models/NotificationModal')
const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require('../middleware/errorHandler')

exports.newNotification = catchAsyncError(async (req, res, next) => {
  const { content } = req.body

  const order = await Notification.create({
    content,
  })

  res.status(200).json({
    success: true,
    order,
  })
})
