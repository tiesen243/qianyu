import { Card } from 'heroui-native'
import { SearchField } from 'heroui-native/search-field'
import { useMemo, useState } from 'react'
import { FlatList, Image } from 'react-native'

import { Container } from '@/components/container'

export default function SearchScreen() {
  const [searchValue, setSearchValue] = useState('')

  const filteredUsers = useMemo(() => {
    const lowercasedValue = searchValue.toLowerCase()
    return users.filter((user) =>
      user.name.toLowerCase().includes(lowercasedValue)
    )
  }, [searchValue])

  return (
    <Container className='px-4' inTab>
      <SearchField value={searchValue} onChange={setSearchValue}>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>

      <FlatList
        contentContainerClassName='gap-4 '
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card className='flex-row gap-4'>
            <Image
              source={{ uri: item.avatarUrl }}
              className='size-24 rounded-lg'
            />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Description>User ID: {item.id}</Card.Description>
            </Card.Body>
          </Card>
        )}
      />
    </Container>
  )
}

const users = [
  { id: 1, name: 'Alice Smith', avatarUrl: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Bob Jones', avatarUrl: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Charlie Brown', avatarUrl: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Diana Prince', avatarUrl: 'https://i.pravatar.cc/150?u=4' },
  { id: 5, name: 'Ethan Hunt', avatarUrl: 'https://i.pravatar.cc/150?u=5' },
  {
    id: 6,
    name: 'Fiona Gallagher',
    avatarUrl: 'https://i.pravatar.cc/150?u=6',
  },
  { id: 7, name: 'George Miller', avatarUrl: 'https://i.pravatar.cc/150?u=7' },
  { id: 8, name: 'Hannah Abbott', avatarUrl: 'https://i.pravatar.cc/150?u=8' },
  { id: 9, name: 'Ian Wright', avatarUrl: 'https://i.pravatar.cc/150?u=9' },
  {
    id: 10,
    name: 'Julia Roberts',
    avatarUrl: 'https://i.pravatar.cc/150?u=10',
  },
] satisfies {
  id: number
  name: string
  avatarUrl: string
}[]
