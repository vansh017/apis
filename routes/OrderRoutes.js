const express = require('express')
const {
  newOrder,
  orderDetails,
  allOrders,
  updateOrder,
  deleteOrder,
  getAdminOrders,
} = require('../controller/OrderController')
const { isAuthUser, authorizeRoles } = require('../middleware/auth')
const router = express.Router()

router.route('/order/new').post(isAuthUser, newOrder)
router.route('/order/:id').get(isAuthUser, orderDetails)
router.route('/myOrders').get(isAuthUser, allOrders)
router.route('/order/update/:id').put(isAuthUser, updateOrder)
router.route('/order/delete/:id').delete(isAuthUser, deleteOrder)
router
  .route('/admin/orders')
  .get(isAuthUser, authorizeRoles('admin'), getAdminOrders)

module.exports = router
