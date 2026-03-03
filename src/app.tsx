import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { StatusBar, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'

import Navigation from './screens/__root'

function App() {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />

      <Navigation
        theme={theme}
        linking={{
          enabled: 'auto',
          prefixes: [],
        }}
        onReady={() => SplashScreen.hide()}
      />
    </SafeAreaProvider>
  )
}

export default App
