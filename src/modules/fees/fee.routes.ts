import { Router } from "express";
import { FeeController } from "./fee.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

// Only ADMIN can create and update fees
router.post("/", authenticate, authorize("ADMIN"), FeeController.createFee);
router.post("/batch", authenticate, authorize("ADMIN"), FeeController.batchCreateFees);
router.patch("/:id/status", authenticate, authorize("ADMIN"), FeeController.updateFeeStatus);
router.delete("/:id", authenticate, authorize("ADMIN"), FeeController.deleteFee);

// ADMIN, TEACHER, and STUDENT can view fees
router.get("/", authenticate, authorize("ADMIN"), FeeController.getAllFees);
router.get("/student/:studentId", authenticate, authorize("ADMIN", "TEACHER", "STUDENT"), FeeController.getFeesByStudent);

export const feeRoutes = router;