import pool from "../config/database";

export async function getAllDrivers() {
  const [rows] = await pool.execute(`
    SELECT
      d.id,
      d.user_id,
      u.full_name,
      u.phone,
      u.email,
      d.verification_status,
      d.availability_status,
      d.points_balance,
      d.created_at
    FROM drivers d
    INNER JOIN users u ON u.id = d.user_id
    ORDER BY d.created_at DESC
  `);

  return rows;
}

export async function getDriverById(
  driverId: number
) {
  const [rows] = await pool.execute(
    `
    SELECT
      d.id,
      d.user_id,
      u.full_name,
      u.phone,
      u.email,
      d.verification_status,
      d.availability_status,
      d.points_balance
    FROM drivers d
    INNER JOIN users u ON u.id = d.user_id
    WHERE d.id = ?
    LIMIT 1
    `,
    [driverId]
  );

  return (rows as any[])[0] || null;
}

export async function updateDriverVerification(
  driverId: number,
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "SUSPENDED"
) {
  const [result] = await pool.execute(
    `
    UPDATE drivers
    SET verification_status = ?
    WHERE id = ?
    `,
    [status, driverId]
  );

  return result;
}

export async function getAllVehicles() {
  const [rows] = await pool.execute(`
    SELECT
      v.id,
      v.driver_id,
      u.full_name AS driver_name,
      u.phone AS driver_phone,
      v.vehicle_type,
      v.make,
      v.model,
      v.plate_number,
      v.color,
      v.verification_status,
      v.created_at
    FROM vehicles v
    INNER JOIN drivers d ON d.id = v.driver_id
    INNER JOIN users u ON u.id = d.user_id
    ORDER BY v.created_at DESC
  `);

  return rows;
}

export async function updateVehicleVerification(
  vehicleId: number,
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
) {
  const [result] = await pool.execute(
    `
    UPDATE vehicles
    SET verification_status = ?
    WHERE id = ?
    `,
    [status, vehicleId]
  );

  return result;
}