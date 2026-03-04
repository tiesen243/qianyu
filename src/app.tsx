import '@/globals.css'

import { StatusBar, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'
import { Provider as ReduxProvider } from 'react-redux'

import { DarkTheme, LightTheme } from '@/lib/theme'
import { store } from '@/redux/store'
import Navigation from '@/screens/__root'

function App() {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />

      <ReduxProvider store={store}>
        <Navigation
          theme={theme}
          linking={{
            enabled: 'auto',
            prefixes: [],
          }}
          onReady={() => SplashScreen.hide()}
        />
      </ReduxProvider>
    </SafeAreaProvider>
  )
}

export default App
