import { useNavigation } from '@react-navigation/native'
import { Button } from 'heroui-native/button'
import { Input } from 'heroui-native/input'
import { useState } from 'react'
import { Text } from 'react-native'

import { Container } from '@/components/container'
import { useLab7 } from '@/screens/(labs)/lab-7/_context'

export default function LoginScreen() {
  const { setUsername } = useLab7()
  const navigation = useNavigation()

  const [data, setData] = useState({
    username: '',
    password: '',
  })

  const handleSubmit = () => {
    setUsername(data.username)
    navigation.navigate('labs', {
      screen: 'lab-7',
      params: { screen: 'profile' } as never,
    })
  }

  return (
    <Container style={{ paddingTop: 16, paddingInline: 16 }} inTab>
      <Text className='text-foreground'>Username</Text>
      <Input
        value={data.username}
        onChangeText={(text) => setData({ ...data, username: text })}
      />

      <Text className='text-foreground'>Password</Text>
      <Input
        value={data.password}
        onChangeText={(text) => setData({ ...data, password: text })}
        secureTextEntry
      />

      <Button onPress={handleSubmit}>Login</Button>
    </Container>
  )
}
