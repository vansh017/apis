const Product = require('../models/ProductModels')
const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require('../middleware/errorHandler')
const Features = require('./Features')
const { checkUser } = require('../middleware/auth')

//create product
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.userId = req.user.id
  const product = await Product.create(req.body)
  res.status(201).json({
    success: true,
    product,
  })
})

//get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const apiFeatures = new Features(Product.find(), req.query).search().filter()

  const products = await apiFeatures.query
  const productsCount = await Product.countDocuments()
  res.status(200).json({
    message: 'success',
    products,
    productsCount,
  })
})

//get product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) return next(new ErrorHandler('product not found', 400))

  res.status(200).json({
    success: true,
    product,
  })
})

//update product
exports.updateProducts = catchAsyncError(async (req, res, next) => {
  let product = Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler('product not found', 404))
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: false,
    useFindAndModify: false,
  })
  res.status(200).json({
    success: true,
    product,
  })
})

//delete product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) return next(new ErrorHandler('product not found', 400))

  await product.deleteOne()
  res.status(200).json({
    success: true,
    message: 'product deleted ',
  })
})
