import pool from "../config/database";
import { PoolConnection } from "mysql2/promise";

export async function createRide(
  passengerId: number,
  pickupAddress: string,
  destinationAddress: string,
  pickupLat: number,
  pickupLng: number,
  destinationLat: number,
  destinationLng: number,
  distanceKm: number,
  priceRwf: number
): Promise<number> {
  const [result] = await pool.execute(
    `INSERT INTO rides (
      passenger_id,
      pickup_address,
      destination_address,
      pickup_lat,
      pickup_lng,
      destination_lat,
      destination_lng,
      distance_km,
      price_rwf
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      passengerId,
      pickupAddress,
      destinationAddress,
      pickupLat,
      pickupLng,
      destinationLat,
      destinationLng,
      distanceKm,
      priceRwf
    ]
  );

  return (result as { insertId: number }).insertId;
}

export async function findRideById(
  rideId: number
) {
  const [rows] = await pool.execute(
    `SELECT *
     FROM rides
     WHERE id = ?
     LIMIT 1`,
    [rideId]
  );

  return (rows as any[])[0] || null;
}

export async function findPassengerRides(
  passengerId: number
) {
  const [rows] = await pool.execute(
    `SELECT *
     FROM rides
     WHERE passenger_id = ?
     ORDER BY created_at DESC`,
    [passengerId]
  );

  return rows;
}

export async function findDriverRides(
  driverId: number
) {
  const [rows] = await pool.execute(
    `SELECT
       r.*,
       u.full_name AS passenger_name,
       u.phone AS passenger_phone
     FROM rides r
     INNER JOIN passengers p
       ON p.id = r.passenger_id
     INNER JOIN users u
       ON u.id = p.user_id
     WHERE r.driver_id = ?
     ORDER BY r.created_at DESC`,
    [driverId]
  );

  return rows;
}

export async function countActiveDriverRides(
  driverId: number,
  connection?: PoolConnection
): Promise<number> {
  const executor = connection || pool;

  const [rows] = await executor.execute(
    `SELECT COUNT(*) AS count
     FROM rides
     WHERE driver_id = ?
     AND status IN (
       'ACCEPTED',
       'DRIVER_ARRIVING',
       'DRIVER_ARRIVED',
       'IN_PROGRESS'
     )`,
    [driverId]
  );

  return Number((rows as any[])[0].count);
}

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

export async function findRideForUpdate(
  rideId: number,
  connection: PoolConnection
) {
  const [rows] = await connection.execute(
    `SELECT *
     FROM rides
     WHERE id = ?
     LIMIT 1
     FOR UPDATE`,
    [rideId]
  );

  return (rows as any[])[0] || null;
}

export async function acceptRide(
  rideId: number,
  driverId: number
) {
  await pool.execute(
    `UPDATE rides
     SET
       driver_id = ?,
       status = 'ACCEPTED',
       accepted_at = CURRENT_TIMESTAMP
     WHERE id = ?
     AND status = 'REQUESTED'`,
    [driverId, rideId]
  );
}

export async function updateRideStatus(
  rideId: number,
  status: string
) {
  await pool.execute(
    `UPDATE rides
     SET status = ?
     WHERE id = ?`,
    [status, rideId]
  );
}