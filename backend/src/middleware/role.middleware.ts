import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware";

export function requireRole(
  ...roles: string[]
) {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required"
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to perform this action"
      });
      return;
    }

    next();
  };
}

export function requireAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  requireRole("ADMIN")(req, res, next);
}

export function requireDriver(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  requireRole("DRIVER")(req, res, next);
}

export function requirePassenger(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  requireRole("PASSENGER")(req, res, next);
}