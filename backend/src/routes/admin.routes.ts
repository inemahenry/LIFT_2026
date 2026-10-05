import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/role.middleware";

import {
  drivers,
  driver,
  verifyDriverAccount,
  vehicles,
  verifyVehicleAccount
} from "../controllers/admin.controller";

const router = Router();

router.use(
  authenticate,
  requireAdmin
);

router.get(
  "/drivers",
  drivers
);

router.get(
  "/drivers/:driverId",
  driver
);

router.patch(
  "/drivers/:driverId/verification",
  verifyDriverAccount
);

router.get(
  "/vehicles",
  vehicles
);

router.patch(
  "/vehicles/:vehicleId/verification",
  verifyVehicleAccount
);

export default router;