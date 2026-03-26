import { useTheme } from '@react-navigation/native'
import { Text } from 'react-native'

import { Container } from '@/components/container'

export default function IndexScreen() {
  const { colors } = useTheme()

  return (
    <Container className='items-center justify-center gap-4 px-4'>
      <Text className='text-2xl font-bold' style={{ color: colors.text }}>
        Welcome to the Qianyu!
      </Text>
    </Container>
  )
}
