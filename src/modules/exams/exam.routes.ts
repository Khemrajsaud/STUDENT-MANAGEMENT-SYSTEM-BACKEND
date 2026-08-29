import { Router } from "express";
import { ExamController } from "./exam.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post("/", authenticate, authorize("ADMIN", "TEACHER"), ExamController.createExam);
router.get("/", authenticate, authorize("ADMIN", "TEACHER", "STUDENT"), ExamController.getAllExams);
router.get("/:id", authenticate, authorize("ADMIN", "TEACHER", "STUDENT"), ExamController.getExamById);
router.patch("/:id", authenticate, authorize("ADMIN", "TEACHER"), ExamController.updateExam);
router.delete("/:id", authenticate, authorize("ADMIN", "TEACHER"), ExamController.deleteExam);

export const examRoutes = router;