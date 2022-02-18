const express = require('express')
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductDetails,
  myProducts,
  getAdminProducts,
  getProductImage,
  updateProduct,
} = require('../controller/ProductController')
const { isAuthUser } = require('../middleware/auth')

const router = express.Router()

router.route('/products').get(getAllProducts)
router.route('/product/new').post(isAuthUser, createProduct)
router.route('/product/:id').get(getProductDetails)
// router.route('/productImg/:id').get(getProductImage)
router.route('/product/:id').put(isAuthUser, updateProduct)
router.route('/product/:id').delete(isAuthUser, deleteProduct)
router.route('/myProducts').get(isAuthUser, myProducts)
router.route('/admin/products').get(isAuthUser, getAdminProducts)
module.exports = router
