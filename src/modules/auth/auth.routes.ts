import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);



// // Protected Route Examples
// router.get("/profile", authenticate, (req, res) => {
//   res.json({ success: true, user: (req as any).user });
// });

// // Admin Only Route Example
// router.get("/admin-dashboard", authenticate, authorize("ADMIN"), (req, res) => {
//   res.json({ success: true, message: "Welcome Admin!" });
// });

// // Admin & Teacher Route Example
// router.get("/teacher-view", authenticate, authorize("ADMIN", "TEACHER"), (req, res) => {
//   res.json({ success: true, message: "Access granted for Teacher or Admin" });
// });

export default router;