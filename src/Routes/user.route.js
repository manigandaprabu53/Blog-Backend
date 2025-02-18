import express from "express";
import userController from "../Controller/user.controller.js";
import verifyAuth from "../MiddleWare/verifyAuth.js";

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/get", verifyAuth, userController.getUserDetails);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password/:id", userController.resetPassword);

export default router;