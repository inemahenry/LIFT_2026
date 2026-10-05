import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function register(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const {
      fullName,
      phone,
      email,
      password,
      role
    } = req.body;

    if (!fullName || !phone || !password) {
      res.status(400).json({
        success: false,
        message: "fullName, phone and password are required"
      });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters"
      });
      return;
    }

    const result = await authService.register({
      fullName,
      phone,
      email,
      password,
      role
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Registration failed"
    });
  }
}

export async function login(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      res.status(400).json({
        success: false,
        message: "Phone and password are required"
      });
      return;
    }

    const result = await authService.login({
      phone,
      password
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Login failed"
    });
  }
}