import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import {
  requireDriver,
  requirePassenger
} from "../middleware/role.middleware";

import {
  create,
  passengerHistory,
  driverHistory,
  accept,
  status,
  complete
} from "../controllers/ride.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  requirePassenger,
  create
);

router.get(
  "/passenger/history",
  authenticate,
  requirePassenger,
  passengerHistory
);

router.get(
  "/driver/history",
  authenticate,
  requireDriver,
  driverHistory
);

router.patch(
  "/:rideId/accept",
  authenticate,
  requireDriver,
  accept
);

router.patch(
  "/:rideId/status",
  authenticate,
  requireDriver,
  status
);

router.patch(
  "/:rideId/complete",
  authenticate,
  requireDriver,
  complete
);

export default router;