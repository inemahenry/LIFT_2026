import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { RouteProp } from '@react-navigation/native'

import { colors, radius, spacing, typography } from '../../theme/theme'
import type { AppStackParamList } from '../../navigation/AppNavigator'

type Route = RouteProp<AppStackParamList, 'RideDetails'>

export default function RideDetailsScreen() {
  const navigation = useNavigation()
  const route = useRoute<Route>()

  const {
    distanceKm,
    priceRwf,
    driverPoints,
  } = route.params

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>

        <Text style={styles.headerTitle}>
          Ride details
        </Text>

        <View style={styles.headerSpace} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          Your LIFT ride
        </Text>

        <Text style={styles.subtitle}>
          Here is the price calculated by LIFT.
        </Text>

        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>
            Ride price
          </Text>

          <Text style={styles.price}>
            {priceRwf.toLocaleString()} RWF
          </Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.row}>
            <Text style={styles.label}>
              Distance
            </Text>

            <Text style={styles.value}>
              {distanceKm.toFixed(2)} km
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>
              Driver points
            </Text>

            <Text style={styles.value}>
              +{driverPoints}
            </Text>
          </View>
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>
            Price calculated by LIFT
          </Text>

          <Text style={styles.noticeText}>
            Distance and pricing come directly from the
            LIFT backend.
          </Text>
        </View>

        <Pressable
          onPress={() => {
            // Payment will be connected in the next batch.
          }}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.buttonText}>
            Continue to payment
          </Text>
        </Pressable>
      </View>
    </View>
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
    paddingBottom: spacing.lg,
  },

  back: {
    fontFamily: typography.fontFamilySemiBold,
    fontSize: 16,
    color: colors.primary,
  },

  headerTitle: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 19,
    color: colors.text,
  },

  headerSpace: {
    width: 45,
  },

  content: {
    flex: 1,
    padding: spacing.xxl,
  },

  title: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 30,
    color: colors.text,
  },

  subtitle: {
    marginTop: 6,
    marginBottom: spacing.xxl,
    fontFamily: typography.fontFamily,
    fontSize: 15,
    color: colors.textSecondary,
  },

  priceCard: {
    padding: spacing.xxl,
    borderRadius: radius.xl,
    backgroundColor: colors.primary,
  },

  priceLabel: {
    fontFamily: typography.fontFamily,
    fontSize: 14,
    color: '#DDEEFF',
  },

  price: {
    marginTop: 8,
    fontFamily: typography.fontFamilyBold,
    fontSize: 36,
    color: colors.white,
  },

  infoCard: {
    marginTop: spacing.lg,
    padding: spacing.xl,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  label: {
    fontFamily: typography.fontFamily,
    fontSize: 15,
    color: colors.textSecondary,
  },

  value: {
    fontFamily: typography.fontFamilySemiBold,
    fontSize: 16,
    color: colors.text,
  },

  divider: {
    height: 1,
    marginVertical: spacing.lg,
    backgroundColor: colors.border,
  },

  notice: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: '#EAF5FB',
  },

  noticeTitle: {
    fontFamily: typography.fontFamilySemiBold,
    fontSize: 14,
    color: colors.primary,
  },

  noticeText: {
    marginTop: 4,
    fontFamily: typography.fontFamily,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },

  button: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
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
})