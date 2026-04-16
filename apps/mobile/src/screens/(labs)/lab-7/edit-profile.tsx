import { useNavigation } from '@react-navigation/native'
import { Button } from 'heroui-native/button'
import { Input } from 'heroui-native/input'
import { useState } from 'react'

import { Container } from '@/components/container'
import { useLab7 } from '@/screens/(labs)/lab-7/_context'

export default function EditProfileScreen() {
  const { setUsername } = useLab7()
  const navigation = useNavigation()

  const [localUsername, setLocalUsername] = useState('')

  const handleSubmit = () => {
    setUsername(localUsername)
    navigation.navigate('labs', {
      screen: 'lab-7',
      params: { screen: 'profile' } as never,
    })
  }

  return (
    <Container style={{ paddingTop: 16, paddingInline: 16 }} inTab>
      <Input
        value={localUsername}
        onChangeText={setLocalUsername}
        placeholder='New username'
      />

      <Button onPress={handleSubmit}>Update username</Button>
    </Container>
  )
}
