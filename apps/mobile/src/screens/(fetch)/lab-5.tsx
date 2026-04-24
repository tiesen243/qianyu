import { Button } from 'heroui-native/button'
import { Card } from 'heroui-native/card'
import { Input } from 'heroui-native/input'
import { useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

import { Container } from '@/components/container'
import { useSearchProductsQuery } from '@/redux/slices/product.slice'

export default function Lab5Screen() {
  const [search, setSearch] = useState('')
  const [input, setInput] = useState('')

  const { data, isLoading, isError, isFetching } =
    useSearchProductsQuery(search)

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
      {isFetching && (
        <View className='absolute inset-0 z-50 flex-1 items-center justify-center bg-background opacity-75'>
          <ActivityIndicator />
        </View>
      )}

      <View className='flex-row items-center gap-2'>
        <Input
          placeholder='Search products...'
          className='flex-1'
          value={input}
          onChangeText={setInput}
        />

        <Button onPress={() => setSearch(input)}>Search</Button>
      </View>

      <FlatList
        data={data?.products}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName='gap-4'
        renderItem={({ item }) => (
          <Card>
            <Card.Header>
              <Card.Title>{item.title}</Card.Title>
              <Card.Description>
                {item.brand} - {item.category}
              </Card.Description>
            </Card.Header>
            <Card.Body>
              <Text className='text-foreground'>{item.description}</Text>
            </Card.Body>
            <Card.Footer className='flex-row items-center justify-end'>
              <Text className='text-primary'>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(item.price)}
              </Text>
            </Card.Footer>
          </Card>
        )}
      />
    </Container>
  )
}
