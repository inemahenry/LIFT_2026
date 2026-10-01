import express from "express";
import authRoutes from "./routes/auth.routes";
import { authenticate, AuthenticatedRequest } from "./middleware/auth.middleware";
import driverRoutes from "./routes/driver.routes";
import vehicleRoutes from "./routes/vehicle.routes";
import adminConfigRoutes from "./routes/admin-config.routes";
import rideRoutes from "./routes/ride.routes";
import paymentRoutes from "./routes/payment.routes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "LIFT API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/driver", driverRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/admin/config", adminConfigRoutes);
app.use("/api/ride", rideRoutes);
app.use("/api/payment", paymentRoutes);
app.get(
  "/api/auth/me",
  authenticate,
  (req: AuthenticatedRequest, res) => {
    res.json({
      success: true,
      data: req.user
    });
  }
);

export default app;