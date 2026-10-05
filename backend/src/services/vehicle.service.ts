import pool from "../config/database";
import {
  createVehicle,
  findVehiclesByDriver
} from "../repositories/vehicle.repository";

export async function addVehicle(
  userId: number,
  data: {
    vehicleType: string;
    make?: string;
    model?: string;
    plateNumber: string;
    color?: string;
  }
) {
  const [rows] = await pool.execute(
    `SELECT id
     FROM drivers
     WHERE user_id = ?
     LIMIT 1`,
    [userId]
  );

  const drivers = rows as { id: number }[];

  if (!drivers.length) {
    throw new Error("Driver profile not found");
  }

  const driverId = drivers[0].id;

  const vehicleId = await createVehicle(
    driverId,
    data.vehicleType,
    data.make || null,
    data.model || null,
    data.plateNumber,
    data.color || null
  );

  return {
    vehicleId
  };
}

export async function getVehicles(userId: number) {
  const [rows] = await pool.execute(
    `SELECT id
     FROM drivers
     WHERE user_id = ?
     LIMIT 1`,
    [userId]
  );

  const drivers = rows as { id: number }[];

  if (!drivers.length) {
    throw new Error("Driver profile not found");
  }

  return findVehiclesByDriver(drivers[0].id);
}