import pool from "../config/database";
import { PoolConnection } from "mysql2/promise";

export async function findDriverByUserId(
  userId: number,
  connection?: PoolConnection
) {
  const executor = connection || pool;

  const [rows] = await executor.execute(
    `SELECT *
     FROM drivers
     WHERE user_id = ?
     LIMIT 1`,
    [userId]
  );

  return (rows as any[])[0] || null;
}

export async function findPointTransactions(
  driverId: number
) {
  const [rows] = await pool.execute(
    `SELECT
       id,
       ride_id,
       points,
       transaction_type,
       description,
       created_at
     FROM point_transactions
     WHERE driver_id = ?
     ORDER BY created_at DESC, id DESC`,
    [driverId]
  );

  return rows;
}

export async function findActiveRedemption(
  driverId: number,
  connection: PoolConnection
) {
  const [rows] = await connection.execute(
    `SELECT *
     FROM reward_redemptions
     WHERE driver_id = ?
     AND status IN ('PENDING', 'PROCESSING')
     ORDER BY id DESC
     LIMIT 1
     FOR UPDATE`,
    [driverId]
  );

  return (rows as any[])[0] || null;
}

export async function findRedemptionById(
  redemptionId: number,
  connection?: PoolConnection
) {
  const executor = connection || pool;

  const [rows] = await executor.execute(
    `SELECT *
     FROM reward_redemptions
     WHERE id = ?
     LIMIT 1`,
    [redemptionId]
  );

  return (rows as any[])[0] || null;
}

export async function findRewardPaymentByRedemptionId(
  redemptionId: number,
  connection?: PoolConnection
) {
  const executor = connection || pool;

  const [rows] = await executor.execute(
    `SELECT *
     FROM reward_payments
     WHERE redemption_id = ?
     LIMIT 1`,
    [redemptionId]
  );

  return (rows as any[])[0] || null;
}