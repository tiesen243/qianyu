import { Text } from 'react-native'

import { Container } from '@/components/container'
import { AppVersion } from '@/screens/settings/_components/app-version'
import { ThemeSelector } from '@/screens/settings/_components/theme-selector'

export default function SettingsScreen() {
  return (
    <Container className='px-4'>
      <Text className='text-2xl font-bold text-foreground'>Settings</Text>

      <ThemeSelector />

      <AppVersion />
    </Container>
  )
}
