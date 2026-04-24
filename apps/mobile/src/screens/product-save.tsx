import type { StaticScreenProps } from '@react-navigation/native'

import { useNavigation } from '@react-navigation/native'
import { Button } from 'heroui-native/button'
import { Input } from 'heroui-native/input'
import { Label } from 'heroui-native/label'
import { TextArea } from 'heroui-native/text-area'
import { TextField } from 'heroui-native/text-field'
import { useToast } from 'heroui-native/toast'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Text } from 'react-native'

import type { Product } from '@/redux/slices/product.slice'

import { useDispatch, useSelector } from '@/redux/hook'
import { addProduct, editProduct } from '@/redux/slices/product-manager.slice'

export default function ProductSaveScreen({
  route: { params },
}: StaticScreenProps<{ id?: number }>) {
  const navigation = useNavigation()
  const { toast } = useToast()

  const product = useSelector((state) =>
    state.productManager.products.find((p) => p.id === params.id)
  )
  const dispatch = useDispatch()

  const [formData, setFormData] = useState<Omit<Product, 'id'>>(
    product ?? {
      title: '',
      description: '',
      category: '',
      price: 0,
      brand: '',
      image: '',
    }
  )

  useEffect(() => {
    navigation.setOptions({
      title: product?.id
        ? `Edit Product: ${product.title}`
        : 'Create New Product',
    })
  }, [navigation, product?.id, product?.title])

  const handleSubmit = () => {
    dispatch(
      product?.id
        ? editProduct({ id: product.id, data: formData })
        : addProduct(formData)
    )

    toast.show({
      variant: 'success',
      label: product?.id
        ? 'Product updated successfully!'
        : 'Product created successfully!',
    })

    navigation.goBack()
  }

  return (
    <ScrollView className='p-4'>
      <KeyboardAvoidingView className='gap-4' behavior='padding'>
        <Text className='text-lg font-bold text-foreground'>
          {product ? 'Edit Product' : 'Create New Product'}
        </Text>

        {fields.map((field) => (
          <TextField key={field.name}>
            <Label>{field.label}</Label>
            {field.type === 'text-area' ? (
              <TextArea
                value={String(formData ? formData[field.name] : '')}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, [field.name]: text }))
                }
              />
            ) : (
              <Input
                value={String(formData ? formData[field.name] : '')}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, [field.name]: text }))
                }
                keyboardType={field.type}
              />
            )}
          </TextField>
        ))}

        <Button onPress={handleSubmit}>
          {product?.id ? 'Update Product' : 'Create Product'}
        </Button>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const fields = [
  { name: 'title', label: 'Title', type: 'default' },
  { name: 'description', label: 'Description', type: 'text-area' },
  { name: 'category', label: 'Category', type: 'default' },
  { name: 'price', label: 'Price', type: 'numeric' },
  { name: 'brand', label: 'Brand', type: 'default' },
  { name: 'image', label: 'Images (comma separated URLs)', type: 'default' },
] as const
