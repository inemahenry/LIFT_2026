import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    role: string;
  };
}

export function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      res.status(401).json({
        success: false,
        message: "Authorization header is required"
      });
      return;
    }

    if (!authorization.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Authorization must use Bearer token"
      });
      return;
    }

    const token = authorization.substring(7).trim();

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Token is required"
      });
      return;
    }

    const payload = verifyToken(token);

    req.user = {
      userId: payload.userId,
      role: payload.role
    };

    next();
  } catch (error) {
    console.error("JWT verification error:", error);

    res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
}