import pool from "../config/database";

export async function findDriverByUserId(userId: number) {
  const [rows] = await pool.execute(
    `SELECT
       d.id,
       d.user_id,
       d.verification_status,
       d.availability_status,
       d.points_balance,
       u.full_name,
       u.phone,
       u.email
     FROM drivers d
     INNER JOIN users u ON u.id = d.user_id
     WHERE d.user_id = ?
     LIMIT 1`,
    [userId]
  );

  return (rows as any[])[0] || null;
}

export async function updateDriverAvailability(
  userId: number,
  status: "OFFLINE" | "AVAILABLE" | "BUSY"
) {
  await pool.execute(
    `UPDATE drivers
     SET availability_status = ?
     WHERE user_id = ?`,
    [status, userId]
  );
}

export async function updateDriverVerification(
  driverId: number,
  status: "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED"
) {
  await pool.execute(
    `UPDATE drivers
     SET verification_status = ?
     WHERE id = ?`,
    [status, driverId]
  );
}