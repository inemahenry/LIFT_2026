import { StyleSheet, Text, View } from 'react-native'

import { colors, typography } from '../../theme/theme'

export default function RidesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your rides</Text>
      <Text style={styles.subtitle}>
        Your ride history will appear here.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.ivory,
    padding: 24,
  },

  title: {
    fontFamily: typography.fontFamilyBold,
    fontSize: 28,
    color: colors.text,
  },

  subtitle: {
    marginTop: 8,
    fontFamily: typography.fontFamily,
    fontSize: 15,
    color: colors.textSecondary,
  },
})