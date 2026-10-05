import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import * as vehicleService from "../services/vehicle.service";

export async function create(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const {
      vehicleType,
      make,
      model,
      plateNumber,
      color
    } = req.body;

    if (!vehicleType || !plateNumber) {
      res.status(400).json({
        success: false,
        message: "vehicleType and plateNumber are required"
      });
      return;
    }

    const result = await vehicleService.addVehicle(
      req.user!.userId,
      {
        vehicleType,
        make,
        model,
        plateNumber,
        color
      }
    );

    res.status(201).json({
      success: true,
      message: "Vehicle registered successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error
        ? error.message
        : "Vehicle registration failed"
    });
  }
}

export async function list(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const vehicles = await vehicleService.getVehicles(
      req.user!.userId
    );

    res.json({
      success: true,
      data: vehicles
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error
        ? error.message
        : "Unable to retrieve vehicles"
    });
  }
}