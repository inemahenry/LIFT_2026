import pool from "../config/database";

export async function createVehicle(
  driverId: number,
  vehicleType: string,
  make: string | null,
  model: string | null,
  plateNumber: string,
  color: string | null
) {
  const [result] = await pool.execute(
    `INSERT INTO vehicles
      (
        driver_id,
        vehicle_type,
        make,
        model,
        plate_number,
        color
      )
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      driverId,
      vehicleType,
      make,
      model,
      plateNumber,
      color
    ]
  );

  return (result as { insertId: number }).insertId;
}

export async function findVehiclesByDriver(
  driverId: number
) {
  const [rows] = await pool.execute(
    `SELECT *
     FROM vehicles
     WHERE driver_id = ?
     ORDER BY created_at DESC`,
    [driverId]
  );

  return rows;
}