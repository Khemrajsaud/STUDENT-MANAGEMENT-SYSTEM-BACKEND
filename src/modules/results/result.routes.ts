import { Router } from "express";
import { ResultController } from "./result.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post("/", authenticate, authorize("ADMIN", "TEACHER"), ResultController.createResult);
router.post("/batch", authenticate, authorize("ADMIN", "TEACHER"), ResultController.batchCreateResults);
router.get("/exam/:examId", authenticate, authorize("ADMIN", "TEACHER"), ResultController.getResultsByExam);
router.get("/student/:studentId", authenticate, authorize("ADMIN", "TEACHER", "STUDENT"), ResultController.getResultsByStudent);
router.delete("/:id", authenticate, authorize("ADMIN", "TEACHER"), ResultController.deleteResult);

export const resultRoutes = router;