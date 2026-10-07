export type RideStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'DRIVER_ARRIVING'
  | 'DRIVER_ARRIVED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'

export interface Ride {
  id: number
  distanceKm: number
  priceRwf: number
  driverPoints: number
  status?: RideStatus
}

export interface CreateRideRequest {
  pickupAddress: string
  pickupLatitude: number
  pickupLongitude: number
  destinationAddress: string
  destinationLatitude: number
  destinationLongitude: number
}

export interface CreateRideResponse {
  success: boolean
  message: string
  data: Ride
}