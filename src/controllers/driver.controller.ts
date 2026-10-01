import { Response } from "express";
import {
  AuthenticatedRequest
} from "../middleware/auth.middleware";
import * as driverService from "../services/driver.service";

export async function getProfile(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const driver = await driverService.getDriverProfile(
      req.user!.userId
    );

    res.json({
      success: true,
      data: driver
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error instanceof Error
        ? error.message
        : "Driver not found"
    });
  }
}

export async function setAvailability(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const { status } = req.body;

    const allowed = [
      "OFFLINE",
      "AVAILABLE",
      "BUSY"
    ];

    if (!allowed.includes(status)) {
      res.status(400).json({
        success: false,
        message: "Invalid availability status"
      });
      return;
    }

    const result = await driverService.setAvailability(
      req.user!.userId,
      status
    );

    res.json({
      success: true,
      message: "Availability updated",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error
        ? error.message
        : "Unable to update availability"
    });
  }
}