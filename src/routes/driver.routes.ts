import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  getProfile,
  setAvailability
} from "../controllers/driver.controller";

const router = Router();

router.get("/profile", authenticate, getProfile);

router.patch(
  "/availability",
  authenticate,
  setAvailability
);

export default router;