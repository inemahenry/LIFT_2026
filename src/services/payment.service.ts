import pool from "../config/database";

export async function createPayment(
  userId: number,
  rideId: number,
  provider: string
) {
  const [rows] = await pool.execute(
    `SELECT
       r.id,
       r.price_rwf,
       r.status,
       p.id AS passenger_id
     FROM rides r
     INNER JOIN passengers p
       ON p.id = r.passenger_id
     WHERE r.id = ?
       AND p.user_id = ?
     LIMIT 1`,
    [rideId, userId]
  );

  const ride = (rows as any[])[0];

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "REQUESTED") {
    throw new Error(
      "Payment can only be created for a requested ride"
    );
  }

  const [existing] = await pool.execute(
    `SELECT id
     FROM payments
     WHERE ride_id = ?
     AND status = 'SUCCESS'
     LIMIT 1`,
    [rideId]
  );

  if ((existing as any[]).length) {
    throw new Error(
      "Ride has already been paid"
    );
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

  return {
    paymentId:
      (result as { insertId: number }).insertId,
    amountRwf: ride.price_rwf,
    status: "PENDING"
  };
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
      throw new Error(
        "Payment not found"
      );
    }

    if (payment.status === "SUCCESS") {
      await connection.commit();

      return {
        paymentId,
        status: "SUCCESS"
      };
    }

    await connection.execute(
      `UPDATE payments
       SET
         status = 'SUCCESS',
         provider_transaction_id = ?
       WHERE id = ?`,
      [
        providerTransactionId,
        paymentId
      ]
    );

    await connection.commit();

    return {
      paymentId,
      status: "SUCCESS"
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}