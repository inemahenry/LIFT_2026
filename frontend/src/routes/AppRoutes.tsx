import { Route, Routes } from 'react-router-dom'

import Landing from '../pages/Landing'
import NotFound from '../pages/NotFound'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

import MobileLayout from '../layouts/MobileLayout'
import DriverLayout from '../layouts/DriverLayout'
import AdminLayout from '../layouts/AdminLayout'

import PassengerHome from '../pages/passenger/PassengerHome'
import FindLift from '../pages/passenger/FindLift'
import RideOptions from '../pages/passenger/RideOptions'
import Booking from '../pages/passenger/Booking'
import RideProgress from '../pages/passenger/RideProgress'
import Completed from '../pages/passenger/Completed'
import Rides from '../pages/passenger/Rides'
import Profile from '../pages/passenger/Profile'

import DriverHome from '../pages/driver/DriverHome'
import RideRequests from '../pages/driver/RideRequests'
import ActiveRide from '../pages/driver/ActiveRide'
import DriverPoints from '../pages/driver/DriverPoints'
import Vehicle from '../pages/driver/Vehicle'
import DriverProfile from '../pages/driver/DriverProfile'

import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminDrivers from '../pages/admin/AdminDrivers'
import AdminPassengers from '../pages/admin/AdminPassengers'
import AdminVehicles from '../pages/admin/AdminVehicles'
import AdminRides from '../pages/admin/AdminRides'
import AdminPoints from '../pages/admin/AdminPoints'
import AdminRewards from '../pages/admin/AdminRewards'
import AdminConfiguration from '../pages/admin/AdminConfiguration'

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PASSENGER */}
      <Route element={<MobileLayout />}>
        <Route path="/passenger" element={<PassengerHome />} />
        <Route path="/passenger/find" element={<FindLift />} />
        <Route path="/passenger/options" element={<RideOptions />} />
        <Route path="/passenger/booking" element={<Booking />} />
        <Route path="/passenger/progress" element={<RideProgress />} />
        <Route path="/passenger/completed" element={<Completed />} />
        <Route path="/passenger/rides" element={<Rides />} />
        <Route path="/passenger/activity" element={<Rides />} />
        <Route path="/passenger/profile" element={<Profile />} />
      </Route>

      {/* DRIVER */}
      <Route element={<DriverLayout />}>
        <Route path="/driver" element={<DriverHome />} />
        <Route path="/driver/rides" element={<RideRequests />} />
        <Route path="/driver/active" element={<ActiveRide />} />
        <Route path="/driver/complete" element={<Completed />} />
        <Route path="/driver/points" element={<DriverPoints />} />
        <Route path="/driver/vehicle" element={<Vehicle />} />
        <Route path="/driver/profile" element={<DriverProfile />} />
      </Route>

      {/* ADMIN */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/rides" element={<AdminRides />} />
        <Route path="/admin/drivers" element={<AdminDrivers />} />
        <Route path="/admin/passengers" element={<AdminPassengers />} />
        <Route path="/admin/vehicles" element={<AdminVehicles />} />
        <Route path="/admin/points" element={<AdminPoints />} />
        <Route path="/admin/rewards" element={<AdminRewards />} />
        <Route
          path="/admin/configuration"
          element={<AdminConfiguration />}
        />
      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}