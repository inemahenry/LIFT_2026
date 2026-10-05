import { Response } from "express";

import {
  AuthenticatedRequest
} from "../middleware/auth.middleware";

import {
  getDriverPoints,
  getDriverPointHistory,
  redeemReward
} from "../services/reward.service";

export async function points(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required"
      });
      return;
    }

    const data =
      await getDriverPoints(
        req.user.userId
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
          : "Unable to load points"
    });
  }
}

export async function history(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required"
      });
      return;
    }

    const data =
      await getDriverPointHistory(
        req.user.userId
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
          : "Unable to load point history"
    });
  }
}

export async function redeem(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required"
      });
      return;
    }

    const data =
      await redeemReward(
        req.user.userId
      );

    res.status(201).json({
      success: true,
      message:
        "Reward redemption created successfully",
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to redeem reward"
    });
  }
}