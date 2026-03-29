import type { StaticScreenProps } from '@react-navigation/native'

import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Separator } from 'heroui-native/separator'
import { useEffect } from 'react'
import { ActivityIndicator, Text } from 'react-native'

import { Container } from '@/components/container'
import { api } from '@/lib/api'

export default function PostDetailsScreen({
  route: { params },
}: StaticScreenProps<{ id: number }>) {
  const { data, isLoading } = useQuery(api.post.one.queryOptions(params))
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

      <Separator />

      <Text className='text-lg text-foreground'>{data.content}</Text>
    </Container>
  )
}
