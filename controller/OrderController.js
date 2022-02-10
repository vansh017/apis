const catchAsyncError = require('../middleware/catchAsyncError')
const Order = require('../models/OrderModels')
const Product = require('../models/ProductModels')
const ErrorHandler = require('../middleware/errorHandler')

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
  })

  res.status(200).json({
    success: true,
    order,
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
