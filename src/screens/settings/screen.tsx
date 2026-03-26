import { Container } from '@/components/container'
import { AppVersion } from '@/screens/settings/_components/app-version'
import { ThemeSelector } from '@/screens/settings/_components/theme-selector'

export default function SettingsScreen() {
  return (
    <Container className='px-4'>
      <ThemeSelector />

      <AppVersion />
    </Container>
  )
}
