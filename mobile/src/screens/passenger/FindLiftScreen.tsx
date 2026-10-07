import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import MapView, {
  Marker,
  MapPressEvent,
  Region,
} from 'react-native-maps'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { rideService } from '../../services/ride.service'
import { colors, radius, spacing, typography } from '../../theme/theme'
import type { AppStackParamList } from '../../navigation/AppNavigator'

type NavigationProp =
  NativeStackNavigationProp<AppStackParamList>

interface Point {
  latitude: number
  longitude: number
  address: string
}

const KIGALI: Region = {
  latitude: -1.9441,
  longitude: 30.0619,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
}

export default function FindLiftScreen() {
  const navigation = useNavigation<NavigationProp>()

  const [pickup, setPickup] = useState<Point | null>(null)
  const [destination, setDestination] =
    useState<Point | null>(null)

  const [pickupAddress, setPickupAddress] = useState('')
  const [destinationAddress, setDestinationAddress] =
    useState('')

  const [region, setRegion] = useState<Region>(KIGALI)
  const [isLocating, setIsLocating] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    locateUser()
  }, [])

  const locateUser = async () => {
    try {
      setIsLocating(true)

      const { status } =
        await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        setIsLocating(false)
        return
      }

      const location =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        })

      const point = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }

      const address = await reverseGeocode(point)

      const pickupPoint: Point = {
        ...point,
        address,
      }

      setPickup(pickupPoint)
      setPickupAddress(address)

      setRegion({
        ...point,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      })
    } catch {
      Alert.alert(
        'Location unavailable',
        'We could not get your current location. You can still choose your destination on the map.',
      )
    } finally {
      setIsLocating(false)
    }
  }

  const reverseGeocode = async (point: {
    latitude: number
    longitude: number
  }) => {
    try {
      const results = await Location.reverseGeocodeAsync(point)

      const result = results[0]

      if (!result) {
        return `${point.latitude.toFixed(5)}, ${point.longitude.toFixed(5)}`
      }

      return [
        result.name,
        result.street,
        result.city,
      ]
        .filter(Boolean)
        .join(', ')
    } catch {
      return `${point.latitude.toFixed(5)}, ${point.longitude.toFixed(5)}`
    }
  }

  const handleMapPress = async (
    event: MapPressEvent,
  ) => {
    const coordinate = event.nativeEvent.coordinate

    const address = await reverseGeocode(coordinate)

    setDestination({
      ...coordinate,
      address,
    })

    setDestinationAddress(address)
  }

  const handleRequestRide = async () => {
    if (!pickup) {
      Alert.alert(
        'Pickup required',
        'Please allow location access or choose a pickup location.',
      )
      return
    }

    if (!destination) {
      Alert.alert(
        'Destination required',
        'Tap your destination on the map or enter it above.',
      )
      return
    }

    if (!destinationAddress.trim()) {
      Alert.alert(
        'Destination required',
        'Please enter your destination.',
      )
      return
    }

    try {
      setIsSubmitting(true)

      const response = await rideService.createRide({
        pickupAddress:
          pickupAddress.trim() || pickup.address,
        pickupLatitude: pickup.latitude,
        pickupLongitude: pickup.longitude,

        destinationAddress:
          destinationAddress.trim() ||
          destination.address,
        destinationLatitude: destination.latitude,
        destinationLongitude: destination.longitude,
      })

      navigation.navigate('RideDetails', {
        rideId: response.data.id,
        distanceKm: response.data.distanceKm,
        priceRwf: response.data.priceRwf,
        driverPoints: response.data.driverPoints,
      })
    } catch (error: any) {
      console.log(
        'CREATE RIDE ERROR:',
        error?.response?.data || error?.message,
      )

      const message =
        error?.response?.data?.message ||
        'We could not create your ride. Please try again.'

      Alert.alert('Ride request failed', message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios' ? 'padding' : undefined
      }
    >
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          disabled={isSubmitting}
        >
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>

        <Text style={styles.title}>Find a LIFT</Text>

        <View style={styles.headerSpace} />
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={KIGALI}
          region={region}
          onPress={handleMapPress}
          showsUserLocation
          showsMyLocationButton
        >
          {pickup && (
            <Marker
              coordinate={{
                latitude: pickup.latitude,
                longitude: pickup.longitude,
              }}
              title="Pickup"
              description={pickup.address}
              pinColor={colors.primary}
            />
          )}

          {destination && (
            <Marker
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              title="Destination"
              description={destination.address}
              pinColor="#F9BFCB"
            />
          )}
        </MapView>

        {isLocating && (
          <View style={styles.locationLoading}>
            <ActivityIndicator
              size="small"
              color={colors.primary}
            />

            <Text style={styles.locationLoadingText}>
              Finding your location...
            </Text>
          </View>
        )}
      </View>

      <View style={styles.sheet}>
        <Text style={styles.sheetTitle}>
          Where are you going?
        </Text>

        <Text style={styles.mapHint}>
          Tap the map to choose your destination.
        </Text>

        <View style={styles.inputBox}>
          <View style={styles.pickupDot} />

          <TextInput
            value={pickupAddress}
            onChangeText={setPickupAddress}
            placeholder="Pickup location"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
        </View>

        <View style={styles.inputBox}>
          <View style={styles.destinationDot} />

          <TextInput
            value={destinationAddress}
            onChangeText={setDestinationAddress}
            placeholder="Destination"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
        </View>

        <Pressable
          onPress={handleRequestRide}
          disabled={isSubmitting}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
            isSubmitting && styles.disabled,
          ]}
        >
          {isSubmitting ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.buttonText}>
              Get ride price
            </Text>
          )}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivory,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.ivory,
  },

  back: {
    fontFamily: typography.fontFamilySemiBold,
    fontSize: 16,
    color: colors.primary,
  },

  title: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 19,
    color: colors.text,
  },

  headerSpace: {
    width: 45,
  },

  mapContainer: {
    flex: 1,
    overflow: 'hidden',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  locationLoading: {
    position: 'absolute',
    top: spacing.lg,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
  },

  locationLoadingText: {
    marginLeft: spacing.sm,
    fontFamily: typography.fontFamilySemiBold,
    fontSize: 13,
    color: colors.text,
  },

  sheet: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    backgroundColor: colors.white,
  },

  sheetTitle: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 21,
    color: colors.text,
  },

  mapHint: {
    marginTop: 4,
    marginBottom: spacing.lg,
    fontFamily: typography.fontFamily,
    fontSize: 13,
    color: colors.textSecondary,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },

  input: {
    flex: 1,
    marginLeft: spacing.md,
    fontFamily: typography.fontFamily,
    fontSize: 14,
    color: colors.text,
  },

  pickupDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },

  destinationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.secondary,
  },

  button: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },

  buttonText: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 16,
    color: colors.white,
  },

  pressed: {
    opacity: 0.8,
  },

  disabled: {
    opacity: 0.6,
  },
})