import { Text } from 'react-native'

import { Container } from '@/components/container'

export default function IndexScreen() {
  return (
    <Container className='items-center justify-center gap-4 px-4' inTab>
      <Text className='text-2xl font-bold text-foreground'>
        Welcome to the Qianyu!
      </Text>
    </Container>
  )
}
