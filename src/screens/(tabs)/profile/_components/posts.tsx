import { Card } from 'heroui-native'
import { Avatar } from 'heroui-native/avatar'
import { FlatList, Image, Text, View } from 'react-native'

import { useProfile } from '@/screens/(tabs)/profile/screen.provider'

export const Posts: React.FC = () => {
  const { profile } = useProfile()

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      contentContainerClassName='gap-2 px-4 pb-20'
      renderItem={({ item }) => (
        <Card key={item.id}>
          <Card.Header className='flex-row items-center gap-2'>
            <Avatar alt={`${profile.name}'s Avatar`} className='mr-3 size-10'>
              <Avatar.Image source={{ uri: profile.avatarUrl }} />
              <Avatar.Fallback>{profile.name.slice(0, 2)}</Avatar.Fallback>
            </Avatar>

            <View>
              <Card.Title>{profile.name}</Card.Title>
              <Card.Description className='text-sm'>
                {item.createdAt.toLocaleDateString()}
              </Card.Description>
            </View>
          </Card.Header>

          <Card.Body className='my-2'>
            <Text className='text-foreground'>{item.content}</Text>
          </Card.Body>

          {item.imageUrl && (
            <Image
              source={{ uri: item.imageUrl }}
              className='h-48 w-full rounded-lg'
            />
          )}
        </Card>
      )}
    />
  )
}

const posts = Array.from({ length: 10 }).map((_, index) => ({
  id: index.toString(),
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'.repeat(
    Math.floor(Math.random() * 3) + 1
  ),
  imageUrl:
    Math.random() > 0.5
      ? `https://picsum.photos/seed/${index}/400/300`
      : undefined,
  createdAt: new Date(),
})) satisfies {
  id: string
  content: string
  imageUrl?: string
  createdAt: Date
}[]
