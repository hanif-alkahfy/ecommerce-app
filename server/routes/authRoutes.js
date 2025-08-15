import express from "express";
import { register, verifyEmail, login, logout, refreshToken, forgotPassword, resetPassword, validateResetToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.get("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/validate-reset-token", validateResetToken);

export default router;
