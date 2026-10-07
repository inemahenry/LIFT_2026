import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { useAuth } from '../context/AuthContext'
import AuthNavigator from './AuthNavigator'
import AppNavigator from './AppNavigator'
import { colors, typography } from '../theme/theme'

export default function RootNavigator() {
  const {
    isAuthenticated,
    isLoading,
    user,
  } = useAuth()

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.logo}>LIFT</Text>

        <ActivityIndicator
          size="large"
          color={colors.primary}
        />

        <Text style={styles.loadingText}>
          Loading your account...
        </Text>
      </View>
    )
  }

  if (!isAuthenticated || !user) {
    return <AuthNavigator />
  }

  if (user.role === 'ADMIN') {
    return <AuthNavigator />
  }

  return <AppNavigator />
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ivory,
  },

  logo: {
    marginBottom: 24,
    fontFamily: typography.fontFamilyBold,
    fontSize: 48,
    letterSpacing: 2,
    color: colors.primary,
  },

  loadingText: {
    marginTop: 12,
    fontFamily: typography.fontFamily,
    fontSize: 15,
    color: colors.textSecondary,
  },
})