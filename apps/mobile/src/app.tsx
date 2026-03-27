import '@/globals.css'

import { HeroUINativeProvider, ToastProvider } from 'heroui-native'
import { StatusBar, useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
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

      <GestureHandlerRootView style={{ flex: 1 }}>
        <HeroUINativeProvider
          config={{
            devInfo: {
              stylingPrinciples: true,
            },
          }}
        >
          <ToastProvider>
            <Navigation
              theme={colorScheme === 'dark' ? DarkTheme : LightTheme}
              linking={{
                enabled: 'auto',
                prefixes: [
                  'qianyu://',
                  'https://qianyu-web-prod.tiesen.workers.dev',
                ],
              }}
              onReady={() => SplashScreen.hide()}
            />
          </ToastProvider>
        </HeroUINativeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default App
