import { Router } from "express";
import { PasswordResetController } from "./password-reset.controller";

const router = Router();

router.post("/forgot-password", PasswordResetController.forgotPassword);
router.post("/reset-password", PasswordResetController.resetPassword);

export const passwordResetRoutes = router;