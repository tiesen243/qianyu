import '@/globals.css'

import { StatusBar, useColorScheme } from 'react-native'
import { Config } from 'react-native-config'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'

import { Providers } from '@/components/providers'
import { DarkTheme, LightTheme } from '@/lib/theme'
import Navigation from '@/screens/__root'

function App() {
  const colorScheme = useColorScheme()

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />

      <Providers>
        <Navigation
          theme={colorScheme === 'dark' ? DarkTheme : LightTheme}
          linking={{
            enabled: 'auto',
            prefixes: [
              Config.RN_SCHEME ? `${Config.RN_SCHEME}://` : '',
              Config.RN_PREFIX ? `https://${Config.RN_PREFIX}` : '',
            ],
          }}
          onReady={() => SplashScreen.hide()}
        />
      </Providers>
    </SafeAreaProvider>
  )
}

export default App
