import { Button } from 'heroui-native/button'
import { useState } from 'react'
import { Text } from 'react-native'

import { Container } from '@/components/container'

export default function Lab1Screen() {
  const [theme, setTheme] = useState('light')

  return (
    <Container
      style={{
        paddingTop: 16,
        paddingInline: 16,
        backgroundColor: theme === 'light' ? '#fff' : '#000',
      }}
      inTab
    >
      <Button onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Chuyển sang chế độ {theme === 'light' ? 'tối' : 'sáng'}
      </Button>

      <Text
        style={{
          color: theme === 'light' ? '#000' : '#fff',
        }}
      >
        Chế độ {theme === 'light' ? 'sáng' : 'tối'}
      </Text>
    </Container>
  )
}
