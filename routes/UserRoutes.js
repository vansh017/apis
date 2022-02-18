const express = require('express')
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePass,
  updateProfile,
  getSingleUser,
  updateUserRole,
  deleteUser,
  getAllUser,
} = require('../controller/UserController')
const { isAuthUser } = require('../middleware/auth')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/password/update').put(isAuthUser, updatePass)

router.route('/profile').get(isAuthUser, getUserDetails)
router.route('/profile/update').put(isAuthUser, updateProfile)
router.route('/admin/users').get(isAuthUser, getAllUser)

router
  .route('/admin/user/:id')
  .get(isAuthUser, getSingleUser)
  .put(isAuthUser, updateUserRole)
  .delete(isAuthUser, deleteUser)
module.exports = router
