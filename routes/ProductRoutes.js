const express = require('express')
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProduct,
  getProductDetails,
} = require('../controller/ProductController')
const { isAuthUser } = require('../middleware/auth')

const router = express.Router()

router.route('/products').get(getAllProducts)
router.route('/products/new').post(isAuthUser, createProduct)
router.route('/product/:id').get(getProductDetails)
router.route('/product/:id').put(isAuthUser, updateProducts)
router.route('/product/:id').delete(isAuthUser, deleteProduct)

module.exports = router
