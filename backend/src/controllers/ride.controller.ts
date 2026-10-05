import { Response } from "express";

import {
  AuthenticatedRequest
} from "../middleware/auth.middleware";

import {
  createBooking,
  getPassengerRides,
  getDriverRides,
  acceptBooking,
  changeStatus,
  completeRide
} from "../services/ride.service";

function getUserId(
  req: AuthenticatedRequest
): number {
  if (!req.user) {
    throw new Error("Authentication required");
  }

  return req.user.userId;
}

export async function create(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const userId = getUserId(req);

    const {
      pickupAddress,
      destinationAddress,
      pickupLat,
      pickupLng,
      destinationLat,
      destinationLng
    } = req.body;

    if (
      !pickupAddress ||
      !destinationAddress
    ) {
      res.status(400).json({
        success: false,
        message:
          "Pickup and destination addresses are required"
      });
      return;
    }

    const coordinates = [
      pickupLat,
      pickupLng,
      destinationLat,
      destinationLng
    ];

    if (
      coordinates.some(
        (value) =>
          typeof value !== "number" ||
          !Number.isFinite(value)
      )
    ) {
      res.status(400).json({
        success: false,
        message:
          "Valid pickup and destination coordinates are required"
      });
      return;
    }

    const result = await createBooking(
      userId,
      {
        pickupAddress: String(pickupAddress),
        destinationAddress: String(
          destinationAddress
        ),
        pickupLat,
        pickupLng,
        destinationLat,
        destinationLng
      }
    );

    res.status(201).json({
      success: true,
      message: "Ride created successfully",
      data: result
    });
  } catch (error) {
    console.error("Create ride error:", error);

    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to create ride"
    });
  }
}

export async function passengerHistory(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const data = await getPassengerRides(
      getUserId(req)
    );

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to load rides"
    });
  }
}

export async function driverHistory(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const data = await getDriverRides(
      getUserId(req)
    );

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to load rides"
    });
  }
}

export async function accept(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const rideId = Number(
      String(req.params.rideId)
    );

    if (
      !Number.isInteger(rideId) ||
      rideId <= 0
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid ride ID"
      });
      return;
    }

    const data = await acceptBooking(
      getUserId(req),
      rideId
    );

    res.json({
      success: true,
      message: "Ride accepted successfully",
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to accept ride"
    });
  }
}

export async function status(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const rideId = Number(
      String(req.params.rideId)
    );

    if (
      !Number.isInteger(rideId) ||
      rideId <= 0
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid ride ID"
      });
      return;
    }

    const { status: newStatus } =
      req.body;

    const allowedStatuses = [
      "DRIVER_ARRIVING",
      "DRIVER_ARRIVED",
      "IN_PROGRESS",
      "CANCELLED"
    ];

    if (
      !allowedStatuses.includes(newStatus)
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid ride status"
      });
      return;
    }

    const data = await changeStatus(
      getUserId(req),
      rideId,
      newStatus
    );

    res.json({
      success: true,
      message: "Ride status updated",
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to update ride status"
    });
  }
}

export async function complete(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const rideId = Number(
      String(req.params.rideId)
    );

    if (
      !Number.isInteger(rideId) ||
      rideId <= 0
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid ride ID"
      });
      return;
    }

    const data = await completeRide(
      getUserId(req),
      rideId
    );

    res.json({
      success: true,
      message: "Ride completed successfully",
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to complete ride"
    });
  }
}