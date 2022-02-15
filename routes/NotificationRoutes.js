const express = require('express')
const { newNotification } = require('../controller/NotificatioCotroller')

router.route('/notification/new').post(isAuthUser, newNotification)

module.exports = router
