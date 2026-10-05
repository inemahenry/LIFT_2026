import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/role.middleware";

import {
  adjust
} from "../controllers/admin-points.controller";

const router = Router();

router.patch(
  "/drivers/:driverId/points",
  authenticate,
  requireAdmin,
  adjust
);

export default router;