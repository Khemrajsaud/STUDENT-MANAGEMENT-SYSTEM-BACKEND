import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post("/login", AuthController.login);
router.get("/users", authenticate, authorize("ADMIN"), AuthController.getUsersByRole);
router.post("/change-password", authenticate, AuthController.changePassword);

export default router;