import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import PassengerHomeScreen from '../screens/passenger/PassengerHomeScreen'
import RidesScreen from '../screens/passenger/RidesScreen'
import ActivityScreen from '../screens/passenger/ActivityScreen'
import ProfileScreen from '../screens/passenger/ProfileScreen'
import { colors, typography } from '../theme/theme'

export type PassengerTabParamList = {
  Home: undefined
  Rides: undefined
  Activity: undefined
  Profile: undefined
}

const Tab = createBottomTabNavigator<PassengerTabParamList>()

export default function PassengerNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {
          fontFamily: typography.fontFamilySemiBold,
          fontSize: 11,
        },
        tabBarStyle: {
          height: 68,
          paddingTop: 7,
          paddingBottom: 8,
          backgroundColor: colors.white,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen name="Home" component={PassengerHomeScreen} />
      <Tab.Screen name="Rides" component={RidesScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}