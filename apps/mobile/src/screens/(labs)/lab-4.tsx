import { Button } from 'heroui-native/button'
import { Input } from 'heroui-native/input'
import * as React from 'react'
import { Text, View } from 'react-native'

import { Container } from '@/components/container'

interface ScreenContextValue {
  name: string
  setName: React.Dispatch<React.SetStateAction<ScreenContextValue['name']>>
}

const ScreenContext = React.createContext<ScreenContextValue | null>(null)

const useScreen = () => {
  const context = React.useContext(ScreenContext)
  if (!context) throw new Error('usePage must be used within a PageProvider')
  return context
}

export default function Lab4Screen() {
  const [name, setName] = React.useState('')
  const value = React.useMemo(() => ({ name, setName }), [name])

  return (
    <ScreenContext value={value}>
      <Container inTab>
        <Header />

        <Form />
      </Container>
    </ScreenContext>
  )
}

const Header: React.FC = () => (
  <View className='flex-row items-center justify-between bg-primary p-4'>
    <Text className='text-foreground'>Header</Text>
    <User />
  </View>
)

const User: React.FC = () => {
  const { name } = useScreen()
  return <Text className='text-foreground'>{name}</Text>
}

const Form: React.FC = () => {
  const [value, setValue] = React.useState('')
  const { setName } = useScreen()

  return (
    <View className='gap-4 p-4'>
      <Text className='mb-2 text-foreground'>Nhập tên của bạn:</Text>
      <Input
        placeholder='Tên của bạn...'
        value={value}
        onChange={(e) => setValue(e.nativeEvent.text)}
      />

      <Button
        onPress={() => {
          setName(value)
          setValue('')
        }}
      >
        Cập nhật tên
      </Button>
    </View>
  )
}
