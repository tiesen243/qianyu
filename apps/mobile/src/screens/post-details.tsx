import type { StaticScreenProps } from '@react-navigation/native'

import { post } from '@qianyu/lib/api/post'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Chip } from 'heroui-native/chip'
import { Separator } from 'heroui-native/separator'
import { useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

import { Container } from '@/components/container'

export default function PostDetailsScreen({
  route: { params },
}: StaticScreenProps<{ id: number }>) {
  const { data, isLoading } = useQuery(post.one.queryOptions(params))
  const navation = useNavigation()

  useEffect(() => {
    navation.setOptions({ title: 'Loading...' })

    if (data) navation.setOptions({ title: data.title })
  }, [data, navation])

  if (isLoading || !data)
    return (
      <Container className='items-center justify-center'>
        <ActivityIndicator />
      </Container>
    )

  return (
    <Container className='px-4'>
      <Text className='text-2xl font-bold text-foreground'>{data.title}</Text>

      <View className='flex-row flex-wrap items-center gap-2'>
        {data.tags.map((tag) => (
          <Chip key={tag} variant='soft'>
            {tag}
          </Chip>
        ))}
      </View>

      <Separator />

      <Text className='text-lg text-foreground'>{data.body}</Text>
    </Container>
  )
}
