import pool from "../config/database";

export async function adjustDriverPoints(
  driverId: number,
  points: number,
  reason: string
) {
  if (!Number.isInteger(points) || points === 0) {
    throw new Error(
      "Points must be a non-zero integer"
    );
  }

  if (!reason.trim()) {
    throw new Error(
      "Adjustment reason is required"
    );
  }

  const connection =
    await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] =
      await connection.execute(
        `SELECT points_balance
         FROM drivers
         WHERE id = ?
         LIMIT 1
         FOR UPDATE`,
        [driverId]
      );

    const driver =
      (rows as any[])[0];

    if (!driver) {
      throw new Error(
        "Driver not found"
      );
    }

    const currentBalance =
      Number(
        driver.points_balance
      );

    const newBalance =
      currentBalance + points;

    if (newBalance < 0) {
      throw new Error(
        "Adjustment would make points balance negative"
      );
    }

    await connection.execute(
      `INSERT INTO point_transactions (
        driver_id,
        ride_id,
        points,
        transaction_type,
        description
      )
      VALUES (?, NULL, ?, 'ADMIN_ADJUSTMENT', ?)`,
      [
        driverId,
        points,
        reason.trim()
      ]
    );

    await connection.execute(
      `UPDATE drivers
       SET points_balance = ?
       WHERE id = ?`,
      [
        newBalance,
        driverId
      ]
    );

    await connection.commit();

    return {
      driverId,
      previousBalance: currentBalance,
      adjustment: points,
      newBalance,
      reason: reason.trim()
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}