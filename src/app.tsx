import '@/globals.css'

import { StatusBar, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'

import { DarkTheme, LightTheme } from '@/lib/theme'
import Navigation from '@/screens/__root'

function App() {
  const colorScheme = useColorScheme()

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />

      <Navigation
        theme={colorScheme === 'dark' ? DarkTheme : LightTheme}
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
