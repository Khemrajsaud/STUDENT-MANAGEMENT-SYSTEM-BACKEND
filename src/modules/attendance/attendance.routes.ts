import { Router } from "express";
import { AttendanceController } from "./attendance.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

// ADMIN and TEACHER can mark attendance
router.post("/", authenticate, authorize("ADMIN", "TEACHER"), AttendanceController.markAttendance);
router.post("/batch", authenticate, authorize("ADMIN", "TEACHER"), AttendanceController.batchMarkAttendance);

// View attendance records
router.get("/date", authenticate, authorize("ADMIN", "TEACHER"), AttendanceController.getAttendanceByDate);
router.get("/student/:studentId", authenticate, authorize("ADMIN", "TEACHER", "STUDENT"), AttendanceController.getAttendanceByStudent);

export default router