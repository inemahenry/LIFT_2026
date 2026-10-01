export function calculateDistanceKm(
  pickupLat: number,
  pickupLng: number,
  destinationLat: number,
  destinationLng: number
): number {
  const earthRadiusKm = 6371;

  const lat1 = toRadians(pickupLat);
  const lat2 = toRadians(destinationLat);

  const deltaLat = toRadians(
    destinationLat - pickupLat
  );

  const deltaLng = toRadians(
    destinationLng - pickupLng
  );

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLng / 2) ** 2;

  const c =
    2 * Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return Number((earthRadiusKm * c).toFixed(2));
}

function toRadians(value: number): number {
  return value * (Math.PI / 180);
}