import type { StaticScreenProps } from '@react-navigation/native'

import { useNavigation } from '@react-navigation/native'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Separator } from 'heroui-native/separator'
import { TrashIcon } from 'lucide-react-native'
import { useEffect } from 'react'
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
} from 'react-native'

import { Container } from '@/components/container'
import { Icon } from '@/components/ui/icon'
import { api } from '@/lib/api'

export function PostDetailsHeaderRight({ id }: { id: number }) {
  const navigation = useNavigation()
  const { mutate } = useMutation({
    ...api.post.delete.mutationOptions(),
    onSuccess: () => navigation.goBack(),
    meta: { filter: { queryKey: api.post.all.queryKey({}) } },
  })

  return (
    <Icon
      as={TrashIcon}
      className='text-foreground'
      onPress={() => mutate({ id })}
    />
  )
}

export default function PostDetailsScreen({
  route: { params },
}: StaticScreenProps<{ id: number }>) {
  const { data, isLoading, refetch, isRefetching } = useQuery(
    api.post.one.queryOptions(params)
  )
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
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
    >
      <Container className='px-4'>
        <Text className='text-2xl font-bold text-foreground'>{data.title}</Text>

        <Separator />

        <Text className='text-lg text-foreground'>{data.content}</Text>
      </Container>
    </ScrollView>
  )
}
