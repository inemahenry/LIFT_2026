import { Response } from "express";

import {
  AuthenticatedRequest
} from "../middleware/auth.middleware";

import {
  completeRewardPayment,
  failRewardPayment
} from "../services/reward.service";

export async function completeReward(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const redemptionId = Number(
      String(req.params.redemptionId)
    );

    const {
      providerTransactionId
    } = req.body;

    if (
      !Number.isInteger(redemptionId) ||
      redemptionId <= 0
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid redemption ID"
      });
      return;
    }

    if (
      typeof providerTransactionId !==
        "string" ||
      !providerTransactionId.trim()
    ) {
      res.status(400).json({
        success: false,
        message:
          "Provider transaction ID is required"
      });
      return;
    }

    const data =
      await completeRewardPayment(
        redemptionId,
        providerTransactionId
      );

    res.json({
      success: true,
      message:
        "Reward payment completed",
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to complete reward"
    });
  }
}

export async function failReward(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const redemptionId = Number(
      String(req.params.redemptionId)
    );

    const {
      reason
    } = req.body;

    if (
      !Number.isInteger(redemptionId) ||
      redemptionId <= 0
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid redemption ID"
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
          "Failure reason is required"
      });
      return;
    }

    const data =
      await failRewardPayment(
        redemptionId,
        reason.trim()
      );

    res.json({
      success: true,
      message:
        "Reward payment failed and points restored",
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to fail reward"
    });
  }
}