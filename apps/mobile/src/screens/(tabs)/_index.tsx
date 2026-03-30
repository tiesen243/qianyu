import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Avatar } from 'heroui-native/avatar'
import { Card } from 'heroui-native/card'
import { Input } from 'heroui-native/input'
import { ActivityIndicator, FlatList, Text } from 'react-native'

import { useAuth } from '@/components/auth-provider'
import { Container } from '@/components/container'
import { api } from '@/lib/api'

export default function IndexScreen() {
  return (
    <Container className='gap-4' inTab>
      <CreatePostCard />

      <PostList />
    </Container>
  )
}

const CreatePostCard: React.FC = () => {
  const navigation = useNavigation()
  const { user } = useAuth()

  return (
    <Card
      className='m-4 mb-2'
      onTouchEnd={() => navigation.navigate('post-create')}
    >
      <Card.Header className='flex-row gap-2'>
        <Avatar alt={`${user.name}'s avatar`} className='size-12'>
          <Avatar.Image source={{ uri: user.avatarUrl }} />
        </Avatar>
        <Input
          className='flex-1 rounded-full'
          placeholder={`What's on your mind, ${user.name.split(' ').shift()}?`}
        />
      </Card.Header>
    </Card>
  )
}

const PostList: React.FC = () => {
  const navigation = useNavigation()
  const { data, isLoading, refetch, isRefetching } = useQuery(
    api.post.all.queryOptions({})
  )

  if (isLoading || !data) return <ActivityIndicator />

  return (
    <FlatList
      data={data.posts}
      keyExtractor={(item) => item.id.toString()}
      contentContainerClassName='px-4 gap-2'
      refreshing={isRefetching}
      onRefresh={refetch}
      renderItem={({ item }) => (
        <Card
          onTouchEnd={() =>
            navigation.navigate('post-details', { id: item.id })
          }
        >
          <Card.Header>
            <Card.Title>{item.title}</Card.Title>
            <Card.Description className='text-sm'>
              {new Date(item.createdAt).toLocaleDateString()}
            </Card.Description>
          </Card.Header>

          <Card.Body>
            <Text className='text-foreground'>
              {item.content.length > 80
                ? `${item.content.slice(0, 80)}...`
                : item.content}
            </Text>
          </Card.Body>
        </Card>
      )}
    />
  )
}
