import {
  getAllDrivers,
  getDriverById,
  updateDriverVerification,
  getAllVehicles,
  updateVehicleVerification
} from "../repositories/admin.repository";

export async function listDrivers() {
  return getAllDrivers();
}

export async function getDriver(
  driverId: number
) {
  const driver =
    await getDriverById(driverId);

  if (!driver) {
    throw new Error("Driver not found");
  }

  return driver;
}

export async function verifyDriver(
  driverId: number,
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "SUSPENDED"
) {
  const driver =
    await getDriverById(driverId);

  if (!driver) {
    throw new Error("Driver not found");
  }

  await updateDriverVerification(
    driverId,
    status
  );

  return getDriverById(driverId);
}

export async function listVehicles() {
  return getAllVehicles();
}

export async function verifyVehicle(
  vehicleId: number,
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
) {
  const result =
    await updateVehicleVerification(
      vehicleId,
      status
    );

  const affectedRows =
    Number(
      (result as any).affectedRows
    );

  if (affectedRows === 0) {
    throw new Error("Vehicle not found");
  }

  return {
    vehicleId,
    verificationStatus: status
  };
}