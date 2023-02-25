const express = require("express");
const router = express.Router();


const checkAuth = require("../../middlewares/chechAuth");
// const checkAdmin = require("../../middlewares/checkAdmin");
const {
  fetchCurrentUser,
  loginUser,
  registerUser,
  verifyOTP,
  handleAdmin
} = require("../../controllers/Auth/index");


router.post("/register", registerUser);

router.post("/login", loginUser);


router.post("/verify", verifyOTP);

router.get("/me", checkAuth, fetchCurrentUser);

// router.get("/admin", checkAuth, checkAdmin, handleAdmin);

module.exports = router;
// api endpoint on route -> it calls controller -> service(contains business logic) -> refers to models and middelwares