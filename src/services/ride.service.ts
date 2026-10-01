import pool from "../config/database";
import { PoolConnection } from "mysql2/promise";
import {
  createRide,
  findRideById,
  findPassengerRides,
  findDriverRides,
  findDriverByUserId,
  countActiveDriverRides,
  findRideForUpdate,
  acceptRide,
  updateRideStatus
} from "../repositories/ride.repository";
import {
  calculateDistanceKm
} from "../utils/distance";
import {
  calculateRidePrice
} from "./pricing.service";
import {
  getNumberConfig
} from "./config.service";

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

  const pricing = await calculateRidePrice(
    distanceKm
  );

  const rideId = await createRide(
    passengers[0].id,
    data.pickupAddress,
    data.destinationAddress,
    data.pickupLat,
    data.pickupLng,
    data.destinationLat,
    data.destinationLng,
    distanceKm,
    pricing.passengerPrice
  );

  return {
    rideId,
    distanceKm,
    priceRwf: pricing.passengerPrice
  };
}

export async function getPassengerRides(
  userId: number
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

  return findPassengerRides(
    passengers[0].id
  );
}

export async function getDriverRides(
  userId: number
) {
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

    if (
      driver.verification_status !==
      "APPROVED"
    ) {
      throw new Error(
        "Driver is not approved"
      );
    }

    const ride =
      await findRideForUpdate(
        rideId,
        connection
      );

    if (!ride) {
      throw new Error("Ride not found");
    }

    if (ride.status !== "REQUESTED") {
      throw new Error(
        "Ride is no longer available"
      );
    }

    const maximumPassengers =
      await getNumberConfig(
        "maximum_passengers"
      );

    const activeRides =
      await countActiveDriverRides(
        driver.id,
        connection
      );

    if (
      activeRides >= maximumPassengers
    ) {
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
  const driver =
    await findDriverByUserId(userId);

  if (!driver) {
    throw new Error(
      "Driver profile not found"
    );
  }

  const ride =
    await findRideById(rideId);

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.driver_id !== driver.id) {
    throw new Error(
      "You are not assigned to this ride"
    );
  }

  const transitions: Record<
    string,
    string[]
  > = {
    ACCEPTED: ["DRIVER_ARRIVING", "CANCELLED"],
    DRIVER_ARRIVING: [
      "DRIVER_ARRIVED",
      "CANCELLED"
    ],
    DRIVER_ARRIVED: [
      "IN_PROGRESS",
      "CANCELLED"
    ],
    IN_PROGRESS: []
  };

  const allowed =
    transitions[ride.status] || [];

  if (!allowed.includes(status)) {
    throw new Error(
      `Cannot change ride from ${ride.status} to ${status}`
    );
  }

  await updateRideStatus(
    rideId,
    status
  );

  return {
    rideId,
    status
  };
}