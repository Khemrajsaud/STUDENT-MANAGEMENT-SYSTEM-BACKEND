import { Router } from "express";
import { StudentController } from "./student.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

// Protect all endpoints with authentication
router.use(authenticate);

// CRUD Routes with RBAC Rules
router.post("/", authorize("ADMIN"), StudentController.create);
router.get("/", authorize("ADMIN", "TEACHER"), StudentController.getAll);
router.get("/me", authorize("STUDENT"), StudentController.getCurrentStudent);
router.get("/:id", authorize("ADMIN", "TEACHER", "STUDENT"), StudentController.getById);
router.patch("/:id", authorize("ADMIN"), StudentController.update);
router.delete("/:id", authorize("ADMIN"), StudentController.delete);

export default router;