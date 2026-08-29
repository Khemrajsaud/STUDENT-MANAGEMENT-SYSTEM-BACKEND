import { Router } from "express";
import { TeacherController } from "./teacher.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

// Remove the brackets [] around roles
router.post("/", authenticate, authorize("ADMIN"), TeacherController.createTeacher);
router.get("/", authenticate, authorize("ADMIN", "TEACHER"), TeacherController.getAllTeachers);
router.get("/:id", authenticate, authorize("ADMIN", "TEACHER"), TeacherController.getTeacherById);
router.delete("/:id", authenticate, authorize("ADMIN"), TeacherController.deleteTeacher);

export default  router