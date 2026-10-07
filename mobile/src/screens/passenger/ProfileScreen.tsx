import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { useAuth } from '../../context/AuthContext'
import { colors, radius, spacing, typography } from '../../theme/theme'

export default function ProfileScreen() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log out',
          style: 'destructive',
          onPress: logout,
        },
      ],
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.fullName?.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.name}>
          {user?.fullName}
        </Text>

        <Text style={styles.phone}>
          {user?.phone}
        </Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoLabel}>Account type</Text>
        <Text style={styles.infoValue}>Passenger</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoLabel}>Status</Text>
        <Text style={styles.infoValue}>{user?.status}</Text>
      </View>

      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [
          styles.logout,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivory,
    padding: spacing.xxl,
  },

  title: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 30,
    color: colors.text,
  },

  profile: {
    alignItems: 'center',
    marginTop: spacing.xxxl,
    marginBottom: spacing.xxxl,
  },

  avatar: {
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 38,
    backgroundColor: colors.primary,
  },

  avatarText: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 30,
    color: colors.white,
  },

  name: {
    marginTop: spacing.lg,
    fontFamily: typography.fontFamilyBold,
    fontSize: 22,
    color: colors.text,
  },

  phone: {
    marginTop: 4,
    fontFamily: typography.fontFamily,
    fontSize: 15,
    color: colors.textSecondary,
  },

  info: {
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  infoLabel: {
    fontFamily: typography.fontFamily,
    fontSize: 13,
    color: colors.textSecondary,
  },

  infoValue: {
    marginTop: 4,
    fontFamily: typography.fontFamilySemiBold,
    fontSize: 16,
    color: colors.text,
  },

  logout: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xxxl,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.error,
  },

  logoutText: {
    fontFamily: typography.fontFamilySemiBold,
    fontSize: 16,
    color: colors.error,
  },

  pressed: {
    opacity: 0.7,
  },
})