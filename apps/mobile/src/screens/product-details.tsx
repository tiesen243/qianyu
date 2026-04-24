import type { StaticScreenProps } from '@react-navigation/native'

import { useNavigation } from '@react-navigation/native'
import { useToast } from 'heroui-native/toast'
import { PencilIcon, TrashIcon } from 'lucide-react-native'
import { useEffect } from 'react'
import { Image, Pressable, Text, View } from 'react-native'

import { Container } from '@/components/container'
import { Icon } from '@/components/ui/icon'
import { useDispatch, useSelector } from '@/redux/hook'
import { deleteProduct } from '@/redux/slices/product-manager.slice'

export function PostDetailsHeaderRight({ id }: { id: number }) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { toast } = useToast()

  const handleDelete = () => {
    dispatch(deleteProduct(id))
    navigation.navigate('fetch', { screen: 'lab-6' })
    toast.show({
      variant: 'success',
      label: 'Product deleted successfully',
    })
  }

  return (
    <View className='flex-row items-center gap-2'>
      <Pressable onPress={() => navigation.navigate('product-save', { id })}>
        <Icon as={PencilIcon} className='text-foreground' />
      </Pressable>

      <Pressable onPress={handleDelete}>
        <Icon as={TrashIcon} className='text-destructive' />
      </Pressable>
    </View>
  )
}

export default function ProductDetailsScreen({
  route: { params },
}: StaticScreenProps<{ id: number }>) {
  const navigation = useNavigation()

  const product = useSelector((state) =>
    state.productManager.products.find((p) => p.id === params.id)
  )

  useEffect(
    () =>
      navigation.setOptions({
        headerRight: () => <PostDetailsHeaderRight id={params.id} />,
      }),
    [navigation, product, params.id]
  )

  if (!product)
    return (
      <Container className='flex-1 items-center justify-center'>
        <Text className='text-destructive'>Product not found</Text>
      </Container>
    )

  return (
    <Container className='p-4'>
      {product.image && (
        <Image
          source={{ uri: product.image }}
          className='w-full rounded-lg'
          style={{ aspectRatio: 1, resizeMode: 'cover' }}
        />
      )}

      <View className='gap-2'>
        <Text className='text-lg font-medium text-primary'>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(product.price)}
        </Text>

        <Text className='text-2xl font-bold text-foreground'>
          {product.title}
        </Text>

        <Text className='text-sm text-muted-foreground'>
          {product.brand} - {product.category}
        </Text>

        <Text className='text-foreground'>{product.description}</Text>
      </View>
    </Container>
  )
}
