import { Router } from "express";
import { ClassController } from "./class.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.post("/", authenticate, authorize("ADMIN"), ClassController.createClass);
router.get("/", authenticate, authorize("ADMIN", "TEACHER", "STUDENT"), ClassController.getAllClasses);
router.get("/:id", authenticate, authorize("ADMIN", "TEACHER", "STUDENT"), ClassController.getClassById);
router.patch("/:id", authenticate, authorize("ADMIN"), ClassController.updateClass);
router.delete("/:id", authenticate, authorize("ADMIN"), ClassController.deleteClass);

export const classRoutes = router;