import { Response } from "express";

import {
  AuthenticatedRequest
} from "../middleware/auth.middleware";

import {
  adjustDriverPoints
} from "../services/admin-points.service";

export async function adjust(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const driverId = Number(
      String(req.params.driverId)
    );

    const {
      points,
      reason
    } = req.body;

    if (
      !Number.isInteger(driverId) ||
      driverId <= 0
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid driver ID"
      });
      return;
    }

    if (
      !Number.isInteger(points) ||
      points === 0
    ) {
      res.status(400).json({
        success: false,
        message:
          "Points must be a non-zero integer"
      });
      return;
    }

    if (
      typeof reason !== "string" ||
      !reason.trim()
    ) {
      res.status(400).json({
        success: false,
        message:
          "Adjustment reason is required"
      });
      return;
    }

    const data =
      await adjustDriverPoints(
        driverId,
        points,
        reason
      );

    res.json({
      success: true,
      message:
        "Driver points adjusted successfully",
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to adjust points"
    });
  }
}