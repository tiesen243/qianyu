import { useNavigation } from '@react-navigation/native'
import { Button } from 'heroui-native/button'
import { Card } from 'heroui-native/card'
import { useEffect } from 'react'
import { ActivityIndicator, FlatList, Image, Text } from 'react-native'

import { Container } from '@/components/container'
import { useDispatch, useSelector } from '@/redux/hook'
import { setProducts } from '@/redux/slices/product-manager.slice'
import { useProductsQuery } from '@/redux/slices/product.slice'

export function Lab6HeaderRight() {
  const navigation = useNavigation()

  return (
    <Button
      size='sm'
      variant='outline'
      onPress={() => navigation.navigate('product-save', { id: undefined })}
    >
      Create new product
    </Button>
  )
}

export default function Lab6Screen() {
  const navigation = useNavigation()

  const products = useSelector((state) => state.productManager.products)
  const dispatch = useDispatch()

  const { data, isLoading, isSuccess, isError } = useProductsQuery()

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Lab6HeaderRight />,
    })
  }, [navigation])

  useEffect(() => {
    if (isSuccess && data.products) dispatch(setProducts(data.products))
  }, [data, isSuccess, dispatch])

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
        data={products}
        keyExtractor={(item) => item.id.toString()}
        contentContainerClassName='gap-4'
        columnWrapperClassName='gap-4'
        numColumns={2}
        renderItem={({ item }) => (
          <Card
            className='flex-1'
            onTouchEnd={() =>
              navigation.navigate('product-details', { id: item.id })
            }
          >
            <Image
              source={{ uri: item.image }}
              className='aspect-square size-40 rounded-lg'
            />

            <Card.Header>
              <Card.Description>
                {item.brand} - {item.category}
              </Card.Description>
              <Card.Title numberOfLines={1}>{item.title}</Card.Title>
            </Card.Header>
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
