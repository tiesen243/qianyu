import { Button } from 'heroui-native/button'
import { Input } from 'heroui-native/input'
import * as React from 'react'
import { FlatList, Text } from 'react-native'

import { Container } from '@/components/container'

const numbers = [
  ...new Set(
    Array.from({ length: 10_000 }, () => Math.floor(Math.random() * 1000))
  ),
]

export default function Lab5Screen() {
  const [search, setSearch] = React.useState('')
  const [theme, setTheme] = React.useState('light')

  const filteredNumbers = React.useMemo(() => {
    console.log('Filtering numbers with search:', search)
    const searchValue = Number.parseInt(search, 10)
    if (Number.isNaN(searchValue)) return numbers
    return numbers.filter((num) => num.toString().startsWith(search))
  }, [search])

  return (
    <Container
      style={{
        paddingTop: 16,
        paddingInline: 16,
        gap: 8,
        backgroundColor: theme === 'light' ? '#fff' : '#000',
      }}
      inTab
    >
      <Input
        placeholder='Nhập số để tìm kiếm...'
        value={search}
        onChange={(e) => setSearch(e.nativeEvent.text)}
        keyboardType='numeric'
      />

      <Button onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Chuyển sang chế độ {theme === 'light' ? 'tối' : 'sáng'}
      </Button>

      <FlatList
        data={filteredNumbers}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <Text
            style={{
              color: theme === 'light' ? '#000' : '#fff',
            }}
          >
            {item}
          </Text>
        )}
        style={{ marginTop: 16 }}
      />
    </Container>
  )
}
