import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { useAuth } from '../../context/AuthContext'
import { colors, radius, spacing, typography } from '../../theme/theme'
import type { AppStackParamList } from '../../navigation/AppNavigator'

type NavigationProp = NativeStackNavigationProp<AppStackParamList>

export default function PassengerHomeScreen() {
  const { user } = useAuth()
  const navigation = useNavigation<NavigationProp>()

  const firstName = user?.fullName?.split(' ')[0] || 'there'

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Good morning,
          </Text>

          <Text style={styles.name}>
            {firstName}
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {firstName.charAt(0).toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          Where are you going?
        </Text>

        <Text style={styles.heroSubtitle}>
          Share the ride. Share the cost.
        </Text>

        <View style={styles.locationBox}>
          <View style={styles.dotPickup} />

          <TextInput
            placeholder="Pickup location"
            placeholderTextColor={colors.muted}
            style={styles.locationInput}
            editable={false}
          />
        </View>

        <View style={styles.connector} />

        <View style={styles.locationBox}>
          <View style={styles.dotDestination} />

          <TextInput
            placeholder="Where to?"
            placeholderTextColor={colors.muted}
            style={styles.locationInput}
            editable={false}
          />
        </View>

        <Pressable
          onPress={() => navigation.navigate('FindLift')}
          style={({ pressed }) => [
            styles.findButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.findButtonText}>
            Find a LIFT
          </Text>
        </Pressable>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Recent activity
        </Text>

        <Pressable>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      <View style={styles.emptyCard}>
        <View style={styles.emptyIcon}>
          <Text style={styles.emptyIconText}>L</Text>
        </View>

        <Text style={styles.emptyTitle}>
          No recent rides
        </Text>

        <Text style={styles.emptyText}>
          Your completed LIFT rides will appear here.
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivory,
  },

  content: {
    padding: spacing.xxl,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xxxl,
  },

  greeting: {
    fontFamily: typography.fontFamily,
    fontSize: 15,
    color: colors.textSecondary,
  },

  name: {
    marginTop: 2,
    fontFamily: typography.fontFamilyBold,
    fontSize: 28,
    color: colors.text,
  },

  avatar: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: colors.primary,
  },

  avatarText: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 19,
    color: colors.white,
  },

  hero: {
    padding: spacing.xxl,
    borderRadius: radius.xl,
    backgroundColor: colors.primary,
  },

  heroTitle: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 25,
    color: colors.white,
  },

  heroSubtitle: {
    marginTop: 5,
    marginBottom: spacing.xxl,
    fontFamily: typography.fontFamily,
    fontSize: 14,
    color: '#DDEEFF',
  },

  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.white,
  },

  locationInput: {
    flex: 1,
    marginLeft: spacing.md,
    fontFamily: typography.fontFamily,
    fontSize: 15,
    color: colors.text,
  },

  dotPickup: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },

  dotDestination: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.secondary,
  },

  connector: {
    width: 1,
    height: 12,
    marginLeft: 25,
    backgroundColor: '#DDEEFF',
  },

  findButton: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.white,
  },

  findButtonText: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 16,
    color: colors.primary,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xxxl,
    marginBottom: spacing.lg,
  },

  sectionTitle: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 20,
    color: colors.text,
  },

  seeAll: {
    fontFamily: typography.fontFamilySemiBold,
    fontSize: 14,
    color: colors.primary,
  },

  emptyCard: {
    alignItems: 'center',
    padding: spacing.xxxl,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
  },

  emptyIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#E8F4FB',
  },

  emptyIconText: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 20,
    color: colors.primary,
  },

  emptyTitle: {
    marginTop: spacing.lg,
    fontFamily: typography.fontFamilySemiBold,
    fontSize: 17,
    color: colors.text,
  },

  emptyText: {
    marginTop: 5,
    fontFamily: typography.fontFamily,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: colors.textSecondary,
  },

  pressed: {
    opacity: 0.8,
  },
})