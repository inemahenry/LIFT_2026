import pool from "../config/database";

export async function createPayment(
  userId: number,
  rideId: number,
  provider: string
) {
  const [rideRows] = await pool.execute(
    `SELECT
       r.id,
       r.passenger_id,
       r.price_rwf,
       r.status
     FROM rides r
     INNER JOIN passengers p
       ON p.id = r.passenger_id
     WHERE r.id = ?
     AND p.user_id = ?
     LIMIT 1`,
    [rideId, userId]
  );

  const ride = (rideRows as any[])[0];

  if (!ride) {
    throw new Error(
      "Ride not found or does not belong to you"
    );
  }

  if (ride.status !== "REQUESTED") {
    throw new Error(
      "Payment can only be created for a requested ride"
    );
  }

  const [existingRows] =
    await pool.execute(
      `SELECT *
       FROM payments
       WHERE ride_id = ?
       LIMIT 1`,
      [rideId]
    );

  const existing =
    (existingRows as any[])[0];

  if (existing) {
    return existing;
  }

  const [result] = await pool.execute(
    `INSERT INTO payments (
      ride_id,
      passenger_id,
      amount_rwf,
      provider,
      status
    )
    VALUES (?, ?, ?, ?, 'PENDING')`,
    [
      rideId,
      ride.passenger_id,
      ride.price_rwf,
      provider
    ]
  );

  const paymentId =
    (result as { insertId: number }).insertId;

  const [rows] = await pool.execute(
    `SELECT *
     FROM payments
     WHERE id = ?
     LIMIT 1`,
    [paymentId]
  );

  return (rows as any[])[0];
}

export async function verifyPayment(
  paymentId: number,
  providerTransactionId: string
) {
  const connection =
    await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] =
      await connection.execute(
        `SELECT *
         FROM payments
         WHERE id = ?
         LIMIT 1
         FOR UPDATE`,
        [paymentId]
      );

    const payment =
      (rows as any[])[0];

    if (!payment) {
      throw new Error("Payment not found");
    }

    if (payment.status === "SUCCESS") {
      await connection.commit();

      return {
        ...payment,
        alreadyVerified: true
      };
    }

    if (
      payment.status !== "PENDING"
    ) {
      throw new Error(
        `Payment cannot be verified from status ${payment.status}`
      );
    }

    if (!providerTransactionId.trim()) {
      throw new Error(
        "Provider transaction ID is required"
      );
    }

    await connection.execute(
      `UPDATE payments
       SET
         provider_transaction_id = ?,
         status = 'SUCCESS'
       WHERE id = ?`,
      [
        providerTransactionId.trim(),
        paymentId
      ]
    );

    await connection.commit();

    return {
      paymentId,
      status: "SUCCESS",
      providerTransactionId:
        providerTransactionId.trim()
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}