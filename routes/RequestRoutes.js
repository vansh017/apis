const express = require('express')
const {
  getAllRequests,
  createRequest,
  updateRequest,
  deleteRequest,
} = require('../controller/RequestController')

const router = express.Router()

router.route('/requests').get(getAllRequests)
router.route('/request/new').post(createRequest)
router.route('/request/:id').put(updateRequest)
router.route('/request/:id').delete(deleteRequest)

module.exports = router
