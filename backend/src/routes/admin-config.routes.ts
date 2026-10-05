import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/role.middleware";
import {
  getAll,
  getOne,
  update
} from "../controllers/admin-config.controller";

const router = Router();

router.use(authenticate);
router.use(requireAdmin);

router.get("/", getAll);
router.get("/:key", getOne);
router.patch("/:key", update);

export default router;