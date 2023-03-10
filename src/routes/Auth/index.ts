import express from "express";
import authController from "../../controllers/Auth";

const { fetchCurrentUser, registerUser, loginUser, verifyOtp } = authController;

const {Router} = express;

export const authRoutes = Router();

authRoutes.post("/register", registerUser);

authRoutes.post("/login", loginUser);

authRoutes.post("/verifyOtp", verifyOtp);

authRoutes.get("/me", fetchCurrentUser);

// TODO authRoutes.get("/me", checkAuth, fetchCurrentUser);

// router.get("/admin", checkAuth, checkAdmin, handleAdmin);

// const checkAuth = require("../../middlewares/chechAuth");
