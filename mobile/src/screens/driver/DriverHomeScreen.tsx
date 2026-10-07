import { StyleSheet, Text, View } from 'react-native'

import { useAuth } from '../../context/AuthContext'
import { colors, typography } from '../../theme/theme'

export default function DriverHomeScreen() {
  const { user } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LIFT</Text>

      <Text style={styles.title}>
        Welcome, {user?.fullName}
      </Text>

      <Text style={styles.subtitle}>
        Driver app
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ivory,
    padding: 24,
  },

  logo: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 48,
    color: colors.primary,
  },

  title: {
    marginTop: 24,
    fontFamily: typography.fontFamilyBold,
    fontSize: 24,
    color: colors.text,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 8,
    fontFamily: typography.fontFamily,
    fontSize: 16,
    color: colors.textSecondary,
  },
})