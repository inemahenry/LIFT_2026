import {
  getNumberConfig
} from "./config.service";

export interface PricingResult {
  distanceKm: number;
  passengerPrice: number;
  driverPoints: number;
  liftShare: number;
}

export async function calculateRidePrice(
  distanceKm: number
): Promise<PricingResult> {
  if (distanceKm < 0) {
    throw new Error("Distance cannot be negative");
  }

  const baseFee =
    await getNumberConfig("base_booking_fee");

  const baseDistance =
    await getNumberConfig("base_distance_km");

  const distanceStep =
    await getNumberConfig("distance_step_km");

  const additionalCharge =
    await getNumberConfig("additional_distance_charge");

  const driverPercentage =
    await getNumberConfig("driver_share_percentage");

  const liftPercentage =
    await getNumberConfig("lift_share_percentage");

  let price = baseFee;

  if (distanceKm > baseDistance) {
    const additionalDistance =
      distanceKm - baseDistance;

    const steps = Math.ceil(
      additionalDistance / distanceStep
    );

    price += steps * additionalCharge;
  }

  price = Math.round(price);

  const driverPoints = Math.round(
    price * (driverPercentage / 100)
  );

  const liftShare = Math.round(
    price * (liftPercentage / 100)
  );

  return {
    distanceKm,
    passengerPrice: price,
    driverPoints,
    liftShare
  };
}