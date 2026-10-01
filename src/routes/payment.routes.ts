import { Router } from "express";
import {
  authenticate
} from "../middleware/auth.middleware";
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

router.post(
  "/:paymentId/verify",
  authenticate,
  verify
);

export default router;