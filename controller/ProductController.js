const Product = require('../models/ProductModels')
const catchAsyncError = require('../middleware/catchAsyncError')
const ErrorHandler = require('../middleware/errorHandler')
const Features = require('./Features')
const { checkUser } = require('../middleware/auth')
const cloudinary = require('cloudinary')

//create product
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = []

  if (typeof req.body.images === 'string') {
    images.push(req.body.images)
  } else {
    images = req.body.images
  }

  const imagesLinks = []

  for (let i = 0; i < 1; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'products',
    })

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    })
  }

  req.body.images = imagesLinks
  req.body.userId = req.user.id
  req.body.userName = req.user.name

  const product = await Product.create(req.body)
  res.status(201).json({
    success: true,
    product,
  })
})

//get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const apiFeatures = new Features(Product.find(), req.query).search().filter()

  let products = await apiFeatures.query
  const productsCount = await Product.countDocuments()
  products = products.filter((i) => i.productStatus !== 'delivered')

  res.status(200).json({
    message: 'success',
    products,
    productsCount,
  })
})
//admin all product
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  let products = await Product.find()

  res.status(200).json({
    success: true,
    products,
  })
})

//get product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  // console.log(name)
  if (!product) return next(new ErrorHandler('product not found', 400))

  res.status(200).json({
    success: true,
    product,
  })
})
//update product
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id)

  if (!product) {
    return next(new ErrorHandler('Product not found', 404))
  }

  // Images Start Here
  let images = []

  if (typeof req.body.images === 'string') {
    images.push(req.body.images)
  } else {
    images = req.body.images
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    // for (let i = 0; i < product.images.length; i++) {
    //   await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    // }

    const imagesLinks = []

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'products',
      })

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      })
    }

    req.body.images = imagesLinks
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    product,
  })
})
//user all product
exports.myProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find({ userId: req.user._id })

  res.status(200).json({
    success: true,
    products,
  })
})

//delete product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  // Deleting Images From Cloudinary
  // for (let i = 0; i < 1; i++) {
  //   await cloudinary.v2.uploader.destroy(product.images[i].public_id)
  // }

  if (!product) return next(new ErrorHandler('product not found', 400))

  await product.deleteOne()
  res.status(200).json({
    success: true,
    message: 'product deleted ',
  })
})
