import { Router } from "express";
import { SubjectController } from "./subject.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post("/", authenticate, authorize("ADMIN"), SubjectController.createSubject);
router.get("/", authenticate, authorize("ADMIN", "TEACHER", "STUDENT"), SubjectController.getAllSubjects);
router.get("/:id", authenticate, authorize("ADMIN", "TEACHER", "STUDENT"), SubjectController.getSubjectById);
router.patch("/:id", authenticate, authorize("ADMIN"), SubjectController.updateSubject);
router.delete("/:id", authenticate, authorize("ADMIN"), SubjectController.deleteSubject);

export const subjectRoutes = router;