import pool from "../config/database";
import {
  findDriverByUserId,
  updateDriverAvailability
} from "../repositories/driver.repository";

export async function getDriverProfile(userId: number) {
  const driver = await findDriverByUserId(userId);

  if (!driver) {
    throw new Error("Driver profile not found");
  }

  return driver;
}

export async function setAvailability(
  userId: number,
  status: "OFFLINE" | "AVAILABLE" | "BUSY"
) {
  const driver =
    await findDriverByUserId(userId);

  if (!driver) {
    throw new Error(
      "Driver profile not found"
    );
  }

  if (
    status !== "OFFLINE" &&
    driver.verification_status !== "APPROVED"
  ) {
    throw new Error(
      "Driver must be approved before becoming available"
    );
  }

  if (status !== "OFFLINE") {
    const [rows] = await pool.execute(
      `
      SELECT id
      FROM vehicles
      WHERE driver_id = ?
      AND verification_status = 'APPROVED'
      LIMIT 1
      `,
      [driver.id]
    );

    if ((rows as any[]).length === 0) {
      throw new Error(
        "Driver must have an approved vehicle"
      );
    }
  }

  await updateDriverAvailability(
    userId,
    status
  );

  return {
    status
  };
}