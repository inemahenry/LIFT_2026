import pool from "../config/database";

import {
  createRide,
  findRideById,
  findPassengerRides,
  findDriverRides,
  findDriverByUserId,
  countActiveDriverRides,
  findRideForUpdate,
  findSuccessfulPaymentForRide
} from "../repositories/ride.repository";

import { calculateDistanceKm } from "../utils/distance";
import { calculateRidePrice } from "./pricing.service";
import { getNumberConfig } from "./config.service";

export async function createBooking(
  userId: number,
  data: {
    pickupAddress: string;
    destinationAddress: string;
    pickupLat: number;
    pickupLng: number;
    destinationLat: number;
    destinationLng: number;
  }
) {
  const [rows] = await pool.execute(
    `SELECT id
     FROM passengers
     WHERE user_id = ?
     LIMIT 1`,
    [userId]
  );

  const passengers = rows as { id: number }[];

  if (!passengers.length) {
    throw new Error("Passenger profile not found");
  }

  const distanceKm = calculateDistanceKm(
    data.pickupLat,
    data.pickupLng,
    data.destinationLat,
    data.destinationLng
  );

  if (distanceKm <= 0) {
    throw new Error("Invalid route distance");
  }

  const pricing = await calculateRidePrice(distanceKm);

  const rideId = await createRide(
    passengers[0].id,
    data.pickupAddress,
    data.destinationAddress,
    data.pickupLat,
    data.pickupLng,
    data.destinationLat,
    data.destinationLng,
    distanceKm,
    pricing.passengerPrice,
    pricing.driverPoints,
    pricing.liftShare,
    await getNumberConfig("driver_share_percentage"),
    await getNumberConfig("lift_share_percentage")
  );

  return {
    rideId,
    distanceKm,
    priceRwf: pricing.passengerPrice,
    driverPoints: pricing.driverPoints
  };
}

export async function getPassengerRides(userId: number) {
  const [rows] = await pool.execute(
    `SELECT id
     FROM passengers
     WHERE user_id = ?
     LIMIT 1`,
    [userId]
  );

  const passengers = rows as { id: number }[];

  if (!passengers.length) {
    throw new Error("Passenger profile not found");
  }

  return findPassengerRides(passengers[0].id);
}

export async function getDriverRides(userId: number) {
  const driver = await findDriverByUserId(userId);

  if (!driver) {
    throw new Error("Driver profile not found");
  }

  return findDriverRides(driver.id);
}

export async function acceptBooking(
  userId: number,
  rideId: number
) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const driver = await findDriverByUserId(
      userId,
      connection
    );

    if (!driver) {
      throw new Error("Driver profile not found");
    }

    if (driver.verification_status !== "APPROVED") {
      throw new Error("Driver is not approved");
    }

    if (driver.availability_status !== "AVAILABLE") {
      throw new Error("Driver must be available to accept a ride");
    }

    const ride = await findRideForUpdate(
      rideId,
      connection
    );

    if (!ride) {
      throw new Error("Ride not found");
    }

    if (ride.status !== "REQUESTED") {
      throw new Error("Ride is no longer available");
    }

    const payment = await findSuccessfulPaymentForRide(
      rideId,
      connection
    );

    if (!payment) {
      throw new Error(
        "Ride payment must be verified before acceptance"
      );
    }

    const maximumPassengers =
      await getNumberConfig("maximum_passengers");

    const activeRides = await countActiveDriverRides(
      driver.id,
      connection
    );

    if (activeRides >= maximumPassengers) {
      throw new Error(
        "Driver has reached passenger capacity"
      );
    }

    await connection.execute(
      `UPDATE rides
       SET
         driver_id = ?,
         status = 'ACCEPTED',
         accepted_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [driver.id, rideId]
    );

    await connection.commit();

    return {
      rideId,
      status: "ACCEPTED"
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function changeStatus(
  userId: number,
  rideId: number,
  status:
    | "DRIVER_ARRIVING"
    | "DRIVER_ARRIVED"
    | "IN_PROGRESS"
    | "CANCELLED"
) {
  const driver = await findDriverByUserId(userId);

  if (!driver) {
    throw new Error("Driver profile not found");
  }

  const ride = await findRideById(rideId);

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.driver_id !== driver.id) {
    throw new Error(
      "You are not assigned to this ride"
    );
  }

  const transitions: Record<string, string[]> = {
    ACCEPTED: [
      "DRIVER_ARRIVING",
      "CANCELLED"
    ],

    DRIVER_ARRIVING: [
      "DRIVER_ARRIVED",
      "CANCELLED"
    ],

    DRIVER_ARRIVED: [
      "IN_PROGRESS",
      "CANCELLED"
    ],

    IN_PROGRESS: [
      "CANCELLED"
    ]
  };

  const allowed =
    transitions[ride.status] || [];

  if (!allowed.includes(status)) {
    throw new Error(
      `Cannot change ride from ${ride.status} to ${status}`
    );
  }

  await pool.execute(
    `UPDATE rides
     SET status = ?
     WHERE id = ?`,
    [status, rideId]
  );

  return {
    rideId,
    status
  };
}

export async function completeRide(
  userId: number,
  rideId: number
) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const driver = await findDriverByUserId(
      userId,
      connection
    );

    if (!driver) {
      throw new Error("Driver profile not found");
    }

    const ride = await findRideForUpdate(
      rideId,
      connection
    );

    if (!ride) {
      throw new Error("Ride not found");
    }

    if (ride.driver_id !== driver.id) {
      throw new Error(
        "You are not assigned to this ride"
      );
    }

    if (ride.status === "COMPLETED") {
      await connection.commit();

      return {
        rideId,
        status: "COMPLETED",
        pointsAwarded: ride.driver_points || 0,
        alreadyCompleted: true
      };
    }

    if (ride.status !== "IN_PROGRESS") {
      throw new Error(
        "Ride must be IN_PROGRESS before completion"
      );
    }

    const payment =
      await findSuccessfulPaymentForRide(
        rideId,
        connection
      );

    if (!payment) {
      throw new Error(
        "Successful payment is required before completing the ride"
      );
    }

    const points =
      Number(ride.driver_points || 0);

    if (points < 0) {
      throw new Error(
        "Invalid driver points calculation"
      );
    }

    const [existingTransactions] =
      await connection.execute(
        `SELECT id
         FROM point_transactions
         WHERE driver_id = ?
         AND ride_id = ?
         AND transaction_type = 'RIDE_EARNING'
         LIMIT 1
         FOR UPDATE`,
        [driver.id, rideId]
      );

    if ((existingTransactions as any[]).length > 0) {
      throw new Error(
        "Points have already been awarded for this ride"
      );
    }

    await connection.execute(
      `UPDATE rides
       SET
         status = 'COMPLETED',
         completed_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [rideId]
    );

    if (points > 0) {
      await connection.execute(
        `INSERT INTO point_transactions (
          driver_id,
          ride_id,
          points,
          transaction_type,
          description
        )
        VALUES (?, ?, ?, 'RIDE_EARNING', ?)`,
        [
          driver.id,
          rideId,
          points,
          `Points earned from completed ride #${rideId}`
        ]
      );

      await connection.execute(
        `UPDATE drivers
         SET points_balance = points_balance + ?
         WHERE id = ?`,
        [points, driver.id]
      );
    }

    await connection.commit();

    return {
      rideId,
      status: "COMPLETED",
      pointsAwarded: points
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}