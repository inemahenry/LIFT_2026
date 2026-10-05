import { Response } from "express";

import {
  AuthenticatedRequest
} from "../middleware/auth.middleware";

import {
  listDrivers,
  getDriver,
  verifyDriver,
  listVehicles,
  verifyVehicle
} from "../services/admin.service";

export async function drivers(
  _req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const data = await listDrivers();

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to load drivers"
    });
  }
}

export async function driver(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const driverId = Number(
      String(req.params.driverId)
    );

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

    const data =
      await getDriver(driverId);

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Driver not found"
    });
  }
}

export async function verifyDriverAccount(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const driverId = Number(
      String(req.params.driverId)
    );

    const {
      status
    } = req.body;

    const allowed = [
      "PENDING",
      "APPROVED",
      "REJECTED",
      "SUSPENDED"
    ];

    if (!allowed.includes(status)) {
      res.status(400).json({
        success: false,
        message: "Invalid verification status"
      });
      return;
    }

    const data =
      await verifyDriver(
        driverId,
        status
      );

    res.json({
      success: true,
      message: "Driver verification updated",
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to update driver"
    });
  }
}

export async function vehicles(
  _req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const data =
      await listVehicles();

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to load vehicles"
    });
  }
}

export async function verifyVehicleAccount(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const vehicleId = Number(
      String(req.params.vehicleId)
    );

    const {
      status
    } = req.body;

    const allowed = [
      "PENDING",
      "APPROVED",
      "REJECTED"
    ];

    if (!allowed.includes(status)) {
      res.status(400).json({
        success: false,
        message: "Invalid verification status"
      });
      return;
    }

    const data =
      await verifyVehicle(
        vehicleId,
        status
      );

    res.json({
      success: true,
      message: "Vehicle verification updated",
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to update vehicle"
    });
  }
}