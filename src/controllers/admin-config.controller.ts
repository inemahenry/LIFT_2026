import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import * as configService from "../services/config.service";

export async function getAll(
  _req: AuthenticatedRequest,
  res: Response
) {
  try {
    const configs = await configService.getConfigurations();

    res.json({
      success: true,
      data: configs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve configurations"
    });
  }
}

export async function getOne(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const config = await configService.getConfiguration(
     String(req.params.key)
    );

    res.json({
      success: true,
      data: config
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error instanceof Error
        ? error.message
        : "Configuration not found"
    });
  }
}

export async function update(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const { value } = req.body;

    if (value === undefined || value === null) {
      res.status(400).json({
        success: false,
        message: "value is required"
      });
      return;
    }

    const config = await configService.updateConfiguration(
      String(req.params.key),
      String(value),
      req.user!.userId
    );

    res.json({
      success: true,
      message: "Configuration updated successfully",
      data: config
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error
        ? error.message
        : "Configuration update failed"
    });
  }
}