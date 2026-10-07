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
  'Register'
>

type Role = 'PASSENGER' | 'DRIVER'

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>()
  const { register } = useAuth()

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role>('PASSENGER')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRegister = async () => {
    if (!fullName.trim() || !phone.trim() || !password) {
      Alert.alert(
        'Missing information',
        'Please complete your name, phone number and password.',
      )
      return
    }

    if (password.length < 8) {
      Alert.alert(
        'Password too short',
        'Your password must contain at least 8 characters.',
      )
      return
    }

    try {
      setIsSubmitting(true)

      await register({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        password,
        role,
      })
    } catch (error: any) {
  console.log('REGISTRATION ERROR:', error)
  console.log('RESPONSE:', error?.response?.data)
  console.log('STATUS:', error?.response?.status)
  console.log('MESSAGE:', error?.message)

  const message =
    error?.response?.data?.message ||
    error?.message ||
    'Unable to create your account. Please try again.'

  Alert.alert('Registration failed', message)
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
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹ Back</Text>
        </Pressable>

        <Text style={styles.title}>Create your account</Text>

        <Text style={styles.subtitle}>
          Join LIFT and get moving.
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Full name</Text>

          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Your full name"
            placeholderTextColor={colors.muted}
            autoCapitalize="words"
            style={styles.input}
            editable={!isSubmitting}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phone number</Text>

          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="07XXXXXXXX"
            placeholderTextColor={colors.muted}
            keyboardType="phone-pad"
            style={styles.input}
            editable={!isSubmitting}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email (optional)</Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={colors.muted}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            editable={!isSubmitting}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="At least 8 characters"
            placeholderTextColor={colors.muted}
            secureTextEntry
            style={styles.input}
            editable={!isSubmitting}
          />
        </View>

        <Text style={styles.label}>I want to use LIFT as</Text>

        <View style={styles.roles}>
          <Pressable
            onPress={() => setRole('PASSENGER')}
            style={[
              styles.role,
              role === 'PASSENGER' && styles.roleSelected,
            ]}
            disabled={isSubmitting}
          >
            <Text
              style={[
                styles.roleTitle,
                role === 'PASSENGER' && styles.roleTextSelected,
              ]}
            >
              Passenger
            </Text>

            <Text
              style={[
                styles.roleDescription,
                role === 'PASSENGER' &&
                  styles.roleTextSelected,
              ]}
            >
              Find and share rides
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setRole('DRIVER')}
            style={[
              styles.role,
              role === 'DRIVER' && styles.roleSelected,
            ]}
            disabled={isSubmitting}
          >
            <Text
              style={[
                styles.roleTitle,
                role === 'DRIVER' && styles.roleTextSelected,
              ]}
            >
              Driver
            </Text>

            <Text
              style={[
                styles.roleDescription,
                role === 'DRIVER' && styles.roleTextSelected,
              ]}
            >
              Share rides with passengers
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={handleRegister}
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
            <Text style={styles.primaryButtonText}>
              Create account
            </Text>
          )}
        </Pressable>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>
            Already have an account?
          </Text>

          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Log in</Text>
          </Pressable>
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
    padding: spacing.xxl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
  },

  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.sm,
    marginBottom: spacing.xxl,
  },

  backText: {
    fontFamily: typography.fontFamilySemiBold,
    fontSize: 16,
    color: colors.primary,
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

  roles: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },

  role: {
    flex: 1,
    minHeight: 90,
    justifyContent: 'center',
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.white,
  },

  roleSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },

  roleTitle: {
    fontFamily: typography.fontFamilySemiBold,
    fontSize: 16,
    color: colors.text,
  },

  roleDescription: {
    marginTop: 4,
    fontFamily: typography.fontFamily,
    fontSize: 12,
    lineHeight: 17,
    color: colors.textSecondary,
  },

  roleTextSelected: {
    color: colors.white,
  },

  primaryButton: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.primary,
  },

  primaryButtonText: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 16,
    color: colors.white,
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: spacing.xxl,
  },

  loginText: {
    fontFamily: typography.fontFamily,
    fontSize: 14,
    color: colors.textSecondary,
  },

  loginLink: {
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