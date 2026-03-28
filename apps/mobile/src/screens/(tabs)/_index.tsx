import { post } from '@qianyu/lib/api/post'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Card } from 'heroui-native/card'
import { ActivityIndicator, FlatList } from 'react-native'

import { Container } from '@/components/container'

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
    post.all.queryOptions({
      limit: 10,
    })
  )

  if (isLoading || !data) return <ActivityIndicator />

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerClassName='gap-2  px-4'
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
              {item.body.length > 80
                ? `${item.body.slice(0, 80)}...`
                : item.body}
            </Card.Description>
          </Card.Header>
        </Card>
      )}
    />
  )
}
