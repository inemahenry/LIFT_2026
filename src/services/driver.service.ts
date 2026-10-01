import {
  findDriverByUserId,
  updateDriverAvailability
} from "../repositories/driver.repository";

export async function getDriverProfile(userId: number) {
  const driver = await findDriverByUserId(userId);

  if (!driver) {
    throw new Error("Driver profile not found");
  }

  return driver;
}

export async function setAvailability(
  userId: number,
  status: "OFFLINE" | "AVAILABLE" | "BUSY"
) {
  const driver = await findDriverByUserId(userId);

  if (!driver) {
    throw new Error("Driver profile not found");
  }

  if (driver.verification_status !== "APPROVED") {
    throw new Error(
      "Driver must be approved before becoming available"
    );
  }

  await updateDriverAvailability(userId, status);

  return {
    status
  };
}