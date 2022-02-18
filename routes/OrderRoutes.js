const express = require('express')
const {
  newOrder,
  orderDetails,
  allOrders,
  updateOrder,
  deleteOrder,
  getAdminOrders,
  confirmEmail,
} = require('../controller/OrderController')
const { isAuthUser } = require('../middleware/auth')
const router = express.Router()

router.route('/order/new').post(isAuthUser, newOrder)
router.route('/order/:id').get(isAuthUser, orderDetails)
router.route('/myOrders').get(isAuthUser, allOrders)
router.route('/confirmEmail').post(isAuthUser, confirmEmail)
router.route('/order/update/:id').put(isAuthUser, updateOrder)
// router.route('/order/delete/:id').delete(isAuthUser, deleteOrder)
router.route('/admin/orders').get(isAuthUser, getAdminOrders)

router.route('/admin/order/:id').delete(isAuthUser, deleteOrder)

module.exports = router
