import {
  useFonts,
  BricolageGrotesque_400Regular,
  BricolageGrotesque_500Medium,
  BricolageGrotesque_600SemiBold,
  BricolageGrotesque_700Bold,
} from '@expo-google-fonts/bricolage-grotesque'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { AuthProvider } from './src/context/AuthContext'
import RootNavigator from './src/navigation/RootNavigator'
import { colors } from './src/theme/theme'

export default function App() {
  const [fontsLoaded] = useFonts({
    BricolageGrotesque: BricolageGrotesque_400Regular,
    BricolageGrotesque_500Medium,
    BricolageGrotesque_600SemiBold,
    BricolageGrotesque_700Bold,
  })

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="dark" />

          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ivory,
  },
})