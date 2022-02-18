const catchAsyncError = require('../middleware/catchAsyncError')
const Order = require('../models/OrderModels')
const Product = require('../models/ProductModels')
const ErrorHandler = require('../middleware/errorHandler')
const sendEmail = require('../middleware/sendEmail')

//creating new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const { name, orderItems, address, phoneNo, totalPrice } = req.body

  const order = await Order.create({
    name,
    orderItems,
    phoneNo,
    address,
    totalPrice,
    user: req.user._id,
    userName: req.user.name,
  })

  res.status(200).json({
    success: true,
    order,
  })
})

// get Orders Admin
exports.getAdminOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find()

  let totalAmount = 0

  orders.forEach((order) => {
    totalAmount += order.totalPrice
  })

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  })
})

//order details
exports.orderDetails = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (!order) return next(new ErrorHandler('order not found', 404))

  res.status(200).json({
    success: true,
    order,
  })
})

//all order
exports.allOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id })

  res.status(200).json({
    success: true,
    orders,
  })
})

//update order status
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (order.orderStatus === 'delivered')
    return next(new ErrorHandler('product delivered', 404))
  order.orderStatus = req.body.status

  await order.save()
  res.status(200).json({
    success: true,
    order,
  })
})

exports.confirmEmail = catchAsyncError(async (req, res, next) => {
  const email = req.body.email
  const subject = req.body.subject
  const message = req.body.message

  try {
    await sendEmail({
      email,
      subject,
      message,
    })

    res.status(200).json({
      success: true,
      message: `mail sent to ${email} successfully`,
    })
  } catch (err) {
    return next(new ErrorHandler(err.message, 500))
  }
})

//delete order
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) return next(new ErrorHandler('order not found', 404))

  await order.remove()
  res.status(200).json({
    success: true,
    message: 'order deleted',
  })
})

//admin order
