import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Card } from 'heroui-native/card'
import { ActivityIndicator, FlatList } from 'react-native'

import { Container } from '@/components/container'
import { api } from '@/lib/api'

export default function IndexScreen() {
  return (
    <Container className='items-center justify-center' inTab>
      <PostList />
    </Container>
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
      contentContainerClassName='gap-2  mt-4 px-4'
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

            <Card.Description>
              {item.content.length > 80
                ? `${item.content.slice(0, 80)}...`
                : item.content}
            </Card.Description>
          </Card.Header>
        </Card>
      )}
    />
  )
}
