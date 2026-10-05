import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/role.middleware";

import {
  completeReward,
  failReward
} from "../controllers/admin-reward.controller";

const router = Router();

router.use(
  authenticate,
  requireAdmin
);

router.patch(
  "/:redemptionId/complete",
  completeReward
);

router.patch(
  "/:redemptionId/fail",
  failReward
);

export default router;