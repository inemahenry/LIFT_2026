import pool from "../config/database";

import {
  findDriverByUserId,
  findPointTransactions,
  findActiveRedemption
} from "../repositories/reward.repository";

import {
  getNumberConfig,
  getBooleanConfig
} from "./config.service";

export async function getDriverPoints(
  userId: number
) {
  const driver =
    await findDriverByUserId(userId);

  if (!driver) {
    throw new Error("Driver profile not found");
  }

  const minimumPoints =
    await getNumberConfig(
      "minimum_reward_points"
    );

  const rewardAmount =
    await getNumberConfig(
      "reward_amount"
    );

  const rewardEnabled =
    await getBooleanConfig(
      "reward_enabled"
    );

  const balance =
    Number(driver.points_balance);

  return {
    pointsBalance: balance,
    minimumRewardPoints: minimumPoints,
    rewardAmountRwf: rewardAmount,
    rewardEnabled,
    eligible:
      rewardEnabled &&
      balance >= minimumPoints
  };
}

export async function getDriverPointHistory(
  userId: number
) {
  const driver =
    await findDriverByUserId(userId);

  if (!driver) {
    throw new Error("Driver profile not found");
  }

  return findPointTransactions(
    driver.id
  );
}

export async function redeemReward(
  userId: number
) {
  const connection =
    await pool.getConnection();

  try {
    await connection.beginTransaction();

    const driver =
      await findDriverByUserId(
        userId,
        connection
      );

    if (!driver) {
      throw new Error(
        "Driver profile not found"
      );
    }

    const rewardEnabled =
      await getBooleanConfig(
        "reward_enabled"
      );

    if (!rewardEnabled) {
      throw new Error(
        "Reward redemption is currently disabled"
      );
    }

    const minimumPoints =
      await getNumberConfig(
        "minimum_reward_points"
      );

    const rewardAmount =
      await getNumberConfig(
        "reward_amount"
      );

    const [driverRows] =
      await connection.execute(
        `SELECT points_balance
         FROM drivers
         WHERE id = ?
         LIMIT 1
         FOR UPDATE`,
        [driver.id]
      );

    const lockedDriver =
      (driverRows as any[])[0];

    if (!lockedDriver) {
      throw new Error(
        "Driver not found"
      );
    }

    const pointsBalance =
      Number(
        lockedDriver.points_balance
      );

    if (
      pointsBalance < minimumPoints
    ) {
      throw new Error(
        `You need at least ${minimumPoints} points to redeem`
      );
    }

    const activeRedemption =
      await findActiveRedemption(
        driver.id,
        connection
      );

    if (activeRedemption) {
      throw new Error(
        "You already have a reward redemption being processed"
      );
    }

    const [redemptionResult] =
      await connection.execute(
        `INSERT INTO reward_redemptions (
          driver_id,
          points_redeemed,
          reward_amount_rwf,
          status
        )
        VALUES (?, ?, ?, 'PENDING')`,
        [
          driver.id,
          minimumPoints,
          rewardAmount
        ]
      );

    const redemptionId =
      (
        redemptionResult as {
          insertId: number;
        }
      ).insertId;

    await connection.execute(
      `INSERT INTO point_transactions (
        driver_id,
        ride_id,
        points,
        transaction_type,
        description
      )
      VALUES (?, NULL, ?, 'REWARD_REDEMPTION', ?)`,
      [
        driver.id,
        -minimumPoints,
        `Redeemed ${minimumPoints} points for ${rewardAmount} RWF reward`
      ]
    );

    const [updateResult] =
      await connection.execute(
        `UPDATE drivers
         SET points_balance =
           points_balance - ?
         WHERE id = ?
         AND points_balance >= ?`,
        [
          minimumPoints,
          driver.id,
          minimumPoints
        ]
      );

    if (
      Number(
        (updateResult as any).affectedRows
      ) !== 1
    ) {
      throw new Error(
        "Unable to deduct reward points"
      );
    }

    const [paymentResult] =
      await connection.execute(
        `INSERT INTO reward_payments (
          redemption_id,
          driver_id,
          amount_rwf,
          provider,
          status
        )
        VALUES (?, ?, ?, 'MOCK', 'PENDING')`,
        [
          redemptionId,
          driver.id,
          rewardAmount
        ]
      );

    const rewardPaymentId =
      (
        paymentResult as {
          insertId: number;
        }
      ).insertId;

    await connection.commit();

    return {
      redemptionId,
      rewardPaymentId,
      pointsRedeemed: minimumPoints,
      rewardAmountRwf: rewardAmount,
      status: "PENDING"
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function completeRewardPayment(
  redemptionId: number,
  providerTransactionId: string
) {
  const connection =
    await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [redemptionRows] =
      await connection.execute(
        `SELECT *
         FROM reward_redemptions
         WHERE id = ?
         LIMIT 1
         FOR UPDATE`,
        [redemptionId]
      );

    const redemption =
      (redemptionRows as any[])[0];

    if (!redemption) {
      throw new Error(
        "Reward redemption not found"
      );
    }

    if (
      redemption.status === "COMPLETED"
    ) {
      await connection.commit();

      return {
        redemptionId,
        status: "COMPLETED",
        alreadyCompleted: true
      };
    }

    if (
      redemption.status !== "PENDING" &&
      redemption.status !== "PROCESSING"
    ) {
      throw new Error(
        `Redemption cannot be completed from status ${redemption.status}`
      );
    }

    if (
      !providerTransactionId.trim()
    ) {
      throw new Error(
        "Provider transaction ID is required"
      );
    }

    const [paymentRows] =
      await connection.execute(
        `SELECT *
         FROM reward_payments
         WHERE redemption_id = ?
         LIMIT 1
         FOR UPDATE`,
        [redemptionId]
      );

    const payment =
      (paymentRows as any[])[0];

    if (!payment) {
      throw new Error(
        "Reward payment not found"
      );
    }

    if (
      payment.status === "COMPLETED"
    ) {
      await connection.commit();

      return {
        redemptionId,
        status: "COMPLETED",
        alreadyCompleted: true
      };
    }

    await connection.execute(
      `UPDATE reward_payments
       SET
         provider_transaction_id = ?,
         status = 'COMPLETED'
       WHERE id = ?`,
      [
        providerTransactionId.trim(),
        payment.id
      ]
    );

    await connection.execute(
      `UPDATE reward_redemptions
       SET
         status = 'COMPLETED',
         completed_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [redemptionId]
    );

    await connection.commit();

    return {
      redemptionId,
      status: "COMPLETED",
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

export async function failRewardPayment(
  redemptionId: number,
  reason: string
) {
  const connection =
    await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [redemptionRows] =
      await connection.execute(
        `SELECT *
         FROM reward_redemptions
         WHERE id = ?
         LIMIT 1
         FOR UPDATE`,
        [redemptionId]
      );

    const redemption =
      (redemptionRows as any[])[0];

    if (!redemption) {
      throw new Error(
        "Reward redemption not found"
      );
    }

    if (
      redemption.status === "FAILED"
    ) {
      await connection.commit();

      return {
        redemptionId,
        status: "FAILED",
        alreadyFailed: true
      };
    }

    if (
      redemption.status === "COMPLETED"
    ) {
      throw new Error(
        "Completed reward cannot be failed"
      );
    }

    const [paymentRows] =
      await connection.execute(
        `SELECT *
         FROM reward_payments
         WHERE redemption_id = ?
         LIMIT 1
         FOR UPDATE`,
        [redemptionId]
      );

    const payment =
      (paymentRows as any[])[0];

    if (!payment) {
      throw new Error(
        "Reward payment not found"
      );
    }

    const pointsToRestore =
      Number(
        redemption.points_redeemed
      );

    const driverId =
      Number(
        redemption.driver_id
      );

    await connection.execute(
      `UPDATE reward_payments
       SET status = 'FAILED'
       WHERE id = ?`,
      [payment.id]
    );

    await connection.execute(
      `UPDATE reward_redemptions
       SET status = 'FAILED'
       WHERE id = ?`,
      [redemptionId]
    );

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
        pointsToRestore,
        `Reward payment failed. ${pointsToRestore} points restored. Reason: ${reason}`
      ]
    );

    await connection.execute(
      `UPDATE drivers
       SET points_balance =
         points_balance + ?
       WHERE id = ?`,
      [
        pointsToRestore,
        driverId
      ]
    );

    await connection.commit();

    return {
      redemptionId,
      status: "FAILED",
      pointsRestored: pointsToRestore
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}