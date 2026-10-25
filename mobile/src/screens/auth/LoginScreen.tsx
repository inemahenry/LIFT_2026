import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
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
import type { AuthStackParamList } from '../../navigation/AuthNavigator'

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Login'
>

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>()
  const { login } = useAuth()

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = async () => {
    if (!phone.trim() || !password) {
      Alert.alert(
        'Missing information',
        'Please enter your phone number and password.',
      )
      return
    }

    try {
      setIsSubmitting(true)

      await login({
        phone: phone.trim(),
        password,
      })
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        'Unable to log in. Please check your details and try again.'

      Alert.alert('Login failed', message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brand}>
          <Text style={styles.logo}>LIFT</Text>

          <Text style={styles.tagline}>
            Simple. Local. Trustworthy.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.title}>Welcome back</Text>

          <Text style={styles.subtitle}>
            Log in to continue your LIFT journey.
          </Text>

          <View style={styles.field}>
            <Text style={styles.label}>Phone nuumber</Text>

            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="07XXXXXXXX"
              placeholderTextColor={colors.muted}
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoComplete="tel"
              style={styles.input}
              editable={!isSubmitting}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor={colors.muted}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="current-password"
                style={styles.passwordInput}
                editable={!isSubmitting}
              />

              <Pressable
                onPress={() =>
                  setShowPassword((previous) => !previous)
                }
                disabled={isSubmitting}
                accessibilityRole="button"
                accessibilityLabel={
                  showPassword ? 'Hide password' : 'Show password'
                }
                accessibilityState={{ selected: showPassword }}
                hitSlop={10}
                style={({ pressed }) => [
                  styles.eyeButton,
                  pressed && styles.eyePressed,
                ]}
              >
                {showPassword ? (
                  <Text style={styles.eyeIcon}>◉</Text>
                ) : (
                  <Text style={styles.eyeIcon}>◎</Text>
                )}
              </Pressable>
            </View>
          </View>

          <Pressable
            onPress={handleLogin}
            disabled={isSubmitting}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressed,
              isSubmitting && styles.disabled,
            ]}
          >
            {isSubmitting ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.primaryButtonText}>Log in</Text>
            )}
          </Pressable>

          <View style={styles.registerRow}>
            <Text style={styles.registerText}>
              Don't have an account?
            </Text>

            <Pressable
              onPress={() => navigation.navigate('Register')}
              disabled={isSubmitting}
            >
              <Text style={styles.registerLink}>
                Create account
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivory,
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.xxl,
  },

  brand: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },

  logo: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 52,
    letterSpacing: 2,
    color: colors.primary,
  },

  tagline: {
    marginTop: 4,
    fontFamily: typography.fontFamily,
    fontSize: 14,
    color: colors.textSecondary,
  },

  form: {
    width: '100%',
  },

  title: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 30,
    color: colors.text,
  },

  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
    fontFamily: typography.fontFamily,
    fontSize: 16,
    lineHeight: 23,
    color: colors.textSecondary,
  },

  field: {
    marginBottom: spacing.lg,
  },

  label: {
    marginBottom: spacing.sm,
    fontFamily: typography.fontFamilySemiBold,
    fontSize: 14,
    color: colors.text,
  },

  input: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    fontFamily: typography.fontFamily,
    fontSize: 16,
    color: colors.text,
  },

  passwordContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.white,
  },

  passwordInput: {
    flex: 1,
    height: '100%',
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm,
    fontFamily: typography.fontFamily,
    fontSize: 16,
    color: colors.text,
  },

  eyeButton: {
    height: 52,
    minWidth: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: radius.md,
    borderBottomRightRadius: radius.md,
  },

  eyeIcon: {
    fontSize: 23,
    color: colors.textSecondary,
  },

  eyePressed: {
    opacity: 0.6,
  },

  primaryButton: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },

  primaryButtonText: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 16,
    color: colors.white,
  },

  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xxl,
    gap: 5,
  },

  registerText: {
    fontFamily: typography.fontFamily,
    fontSize: 14,
    color: colors.textSecondary,
  },

  registerLink: {
    fontFamily: typography.fontFamilySemiBold,
    fontSize: 14,
    color: colors.primary,
  },

  pressed: {
    opacity: 0.8,
  },

  disabled: {
    opacity: 0.6,
  },
})
