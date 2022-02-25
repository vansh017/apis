const express = require("express");
const {getAllRequests, createRequest, updateRequest, deleteRequest, myRequests} = require("../controller/RequestController")
const {isAuthUser } = require('../middleware/auth')
const router=express.Router();

router.route("/requests").get(getAllRequests);
router.route("/request/new").post(isAuthUser ,createRequest );
router.route("/request/:id").put(updateRequest);
router.route("/request/:id").delete(deleteRequest);
router.route("/myRequests").get(isAuthUser , myRequests);

module.exports = router