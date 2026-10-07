import api from './api'
import type {
  CreateRideRequest,
  CreateRideResponse,
} from '../types/ride'

export const rideService = {
  async createRide(
    payload: CreateRideRequest,
  ): Promise<CreateRideResponse> {
    const response = await api.post<CreateRideResponse>(
      '/rides',
      payload,
    )

    return response.data
  },

  async passengerHistory() {
    const response = await api.get('/rides/passenger/history')

    return response.data
  },
}