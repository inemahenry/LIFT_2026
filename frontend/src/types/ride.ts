export type RideStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'DRIVER_ARRIVING'
  | 'DRIVER_ARRIVED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'

export interface LocationPoint {
  latitude: number
  longitude: number
  address: string
}

export interface Driver {
  id: string
  name: string
  rating: number
  rides: number
  vehicle: string
  plateNumber: string
  phone: string
}

export interface Ride {
  id: string
  pickup: LocationPoint
  destination: LocationPoint
  distanceKm: number
  price: number
  status: RideStatus
  estimatedMinutes?: number
  driver?: Driver
}

export interface RideOption {
  id: string
  name: string
  description: string
  price: number
  estimatedMinutes: number
  availableSeats: number
}