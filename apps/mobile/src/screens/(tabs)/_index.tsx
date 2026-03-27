import { Button } from 'heroui-native/button'
import { useThemeColor } from 'heroui-native/hooks'
import { Text } from 'react-native'

import { Container } from '@/components/container'

export default function IndexScreen() {
  const color = useThemeColor('muted')

  return (
    <Container className='items-center justify-center gap-4 px-4' inTab>
      <Text className='text-2xl font-bold text-accent-hover'>
        Welcome to the Qianyu!
      </Text>

      <Button>{color}</Button>
    </Container>
  )
}
