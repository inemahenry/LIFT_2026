import { Response } from "express";
import {
  AuthenticatedRequest
} from "../middleware/auth.middleware";
import * as rideService from "../services/ride.service";

export async function create(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
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
      !destinationAddress ||
      pickupLat === undefined ||
      pickupLng === undefined ||
      destinationLat === undefined ||
      destinationLng === undefined
    ) {
      res.status(400).json({
        success: false,
        message:
          "Pickup, destination and coordinates are required"
      });
      return;
    }

    const result =
      await rideService.createBooking(
        req.user!.userId,
        {
          pickupAddress,
          destinationAddress,
          pickupLat: Number(pickupLat),
          pickupLng: Number(pickupLng),
          destinationLat: Number(destinationLat),
          destinationLng: Number(destinationLng)
        }
      );

    res.status(201).json({
      success: true,
      message: "Ride booking created",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Booking failed"
    });
  }
}

export async function passengerHistory(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const rides =
      await rideService.getPassengerRides(
        req.user!.userId
      );

    res.json({
      success: true,
      data: rides
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to retrieve rides"
    });
  }
}

export async function driverHistory(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const rides =
      await rideService.getDriverRides(
        req.user!.userId
      );

    res.json({
      success: true,
      data: rides
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to retrieve rides"
    });
  }
}

export async function accept(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const rideId =
      Number(req.params.rideId);

    const result =
      await rideService.acceptBooking(
        req.user!.userId,
        rideId
      );

    res.json({
      success: true,
      message: "Ride accepted",
      data: result
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
) {
  try {
    const rideId =
      Number(req.params.rideId);

    const result =
      await rideService.changeStatus(
        req.user!.userId,
        rideId,
        req.body.status
      );

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to update ride"
    });
  }
}