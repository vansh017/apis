const express = require('express')
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProduct,
  getProductDetails,
  myProducts,
} = require('../controller/ProductController')
const { isAuthUser } = require('../middleware/auth')

const router = express.Router()

router.route('/products').get(getAllProducts)
router.route('/product/new').post(isAuthUser, createProduct)
router.route('/product/:id').get(getProductDetails)
router.route('/product/:id').put(isAuthUser, updateProducts)
router.route('/product/:id').delete(isAuthUser, deleteProduct)
router.route('/myProducts').get(isAuthUser, myProducts)

module.exports = router
