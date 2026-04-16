import { useNavigation } from '@react-navigation/native'
import { Button } from 'heroui-native/button'
import { Text } from 'react-native'

import { Container } from '@/components/container'
import { useLab7 } from '@/screens/(labs)/lab-7/_context'

export default function LoginScreen() {
  const { username } = useLab7()
  const navigation = useNavigation()

  return (
    <Container style={{ paddingTop: 16, paddingInline: 16 }} inTab>
      <Text className='text-foreground'>Welcome, {username}!</Text>
      <Button
        onPress={() =>
          navigation.navigate('labs', {
            screen: 'lab-7',
            params: { screen: 'edit-profile' } as never,
          })
        }
      >
        Edit profile
      </Button>
    </Container>
  )
}
