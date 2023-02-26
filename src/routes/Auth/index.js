const express = require("express");
const router = express.Router();


const checkAuth = require("../../middlewares/chechAuth");
const { loginUser, registerUser, verifyOtp } = require("../../controllers/Auth/index");

//  Post Requests
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify", verifyOtp);


// Get Requests


module.exports = router;