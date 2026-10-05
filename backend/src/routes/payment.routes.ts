import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/role.middleware";

import {
  create,
  verify
} from "../controllers/payment.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  create
);

/*
 * Development/MOCK payment verification.
 * In production this should be replaced by
 * the payment provider's verified webhook.
 */
router.post(
  "/:paymentId/verify",
  authenticate,
  requireAdmin,
  verify
);

export default router;