import { Router } from "express";
import {
  authenticate
} from "../middleware/auth.middleware";
import {
  create,
  passengerHistory,
  driverHistory,
  accept,
  status
} from "../controllers/ride.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  create
);

router.get(
  "/passenger/history",
  authenticate,
  passengerHistory
);

router.get(
  "/driver/history",
  authenticate,
  driverHistory
);

router.patch(
  "/:rideId/accept",
  authenticate,
  accept
);

router.patch(
  "/:rideId/status",
  authenticate,
  status
);

export default router;