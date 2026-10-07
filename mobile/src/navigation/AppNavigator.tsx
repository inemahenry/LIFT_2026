import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useAuth } from '../context/AuthContext'
import PassengerNavigator from './PassengerNavigator'
import DriverHomeScreen from '../screens/driver/DriverHomeScreen'
import FindLiftScreen from '../screens/passenger/FindLiftScreen'
import RideDetailsScreen from '../screens/passenger/RideDetailsScreen'

export type AppStackParamList = {
  PassengerHome: undefined
  FindLift: undefined
  RideDetails: {
    rideId: number
    distanceKm: number
    priceRwf: number
    driverPoints: number
  }
  DriverHome: undefined
}

const Stack = createNativeStackNavigator<AppStackParamList>()

export default function AppNavigator() {
  const { user } = useAuth()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user?.role === 'DRIVER' ? (
        <Stack.Screen
          name="DriverHome"
          component={DriverHomeScreen}
        />
      ) : (
        <>
          <Stack.Screen
            name="PassengerHome"
            component={PassengerNavigator}
          />

          <Stack.Screen
            name="FindLift"
            component={FindLiftScreen}
          />

          <Stack.Screen
            name="RideDetails"
            component={RideDetailsScreen}
          />
        </>
      )}
    </Stack.Navigator>
  )
}