import { Text } from 'react-native'

import { Container } from '@/components/container'

export default function SearchScreen() {
  return (
    <Container className='px-4' inTab>
      <Text className='text-2xl font-bold text-foreground'>Search</Text>
    </Container>
  )
}
