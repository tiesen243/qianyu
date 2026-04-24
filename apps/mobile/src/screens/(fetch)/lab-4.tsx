import { Card } from 'heroui-native/card'
import { ActivityIndicator, FlatList, Text } from 'react-native'

import { Container } from '@/components/container'
import { useGetUsersQuery } from '@/redux/slices/user.slice'

export default function Lab4Screen() {
  const { data, isLoading, isError } = useGetUsersQuery()

  if (isLoading)
    return (
      <Container className='flex-1 items-center justify-center'>
        <ActivityIndicator />
      </Container>
    )

  if (isError)
    return (
      <Container className='flex-1 items-center justify-center'>
        <Text className='text-destructive'>Error fetching users</Text>
      </Container>
    )

  return (
    <Container className='p-4'>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName='gap-4'
        renderItem={({ item }) => (
          <Card>
            <Card.Header>
              <Card.Title>{item.name}</Card.Title>
              <Card.Description>{item.email}</Card.Description>
            </Card.Header>
          </Card>
        )}
      />
    </Container>
  )
}
