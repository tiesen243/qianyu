import { Text, View } from 'react-native'

import { AppVersion } from '@/screens/settings/_components/app-version'
import { ThemeSelector } from '@/screens/settings/_components/theme-selector'

export default function SettingsScreen() {
  return (
    <View className='flex-1 gap-6 p-4'>
      <Text className='text-2xl font-bold text-foreground'>Settings</Text>

      <ThemeSelector />

      <AppVersion />
    </View>
  )
}
