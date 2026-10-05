import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { requireDriver } from "../middleware/role.middleware";

import {
  points,
  history,
  redeem
} from "../controllers/reward.controller";

const router = Router();

router.get(
  "/points",
  authenticate,
  requireDriver,
  points
);

router.get(
  "/history",
  authenticate,
  requireDriver,
  history
);

router.post(
  "/redeem",
  authenticate,
  requireDriver,
  redeem
);

export default router;