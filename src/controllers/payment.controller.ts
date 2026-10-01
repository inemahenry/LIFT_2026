import { Response } from "express";
import {
  AuthenticatedRequest
} from "../middleware/auth.middleware";
import * as paymentService from "../services/payment.service";

export async function create(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const rideId =
      Number(req.body.rideId);

    const provider =
      req.body.provider || "MOCK";

    if (!rideId) {
      res.status(400).json({
        success: false,
        message: "rideId is required"
      });
      return;
    }

    const result =
      await paymentService.createPayment(
        req.user!.userId,
        rideId,
        provider
      );

    res.status(201).json({
      success: true,
      message: "Payment created",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Payment creation failed"
    });
  }
}

export async function verify(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const paymentId =
      Number(req.params.paymentId);

    const {
      providerTransactionId
    } = req.body;

    if (!providerTransactionId) {
      res.status(400).json({
        success: false,
        message:
          "providerTransactionId is required"
      });
      return;
    }

    const result =
      await paymentService.verifyPayment(
        paymentId,
        providerTransactionId
      );

    res.json({
      success: true,
      message: "Payment verified",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Payment verification failed"
    });
  }
}