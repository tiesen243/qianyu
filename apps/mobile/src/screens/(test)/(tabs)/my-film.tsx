import { useNavigation } from '@react-navigation/native'
import { Button } from 'heroui-native/button'
import { FlatList, Text, View } from 'react-native'

import { Container } from '@/components/container'
import { useSelector } from '@/redux/hook'
import { FilmCard } from '@/screens/(test)/_components/film-card'

export default function MyFilmScreen() {
  const navigation = useNavigation()
  const movies = useSelector((state) => state.film.movies)

  return (
    <Container className='px-4 pt-4 pb-24'>
      <View className='flex-row items-center'>
        <Text className='flex-1 text-2xl font-bold text-foreground'>
          Phim của tôi
        </Text>
        <Button
          variant='outline'
          size='sm'
          onPress={() =>
            navigation.navigate('test', {
              screen: 'save-film',
              params: { id: undefined },
            })
          }
        >
          Thêm phim
        </Button>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerClassName='gap-4'
        columnWrapperClassName='gap-4'
        renderItem={({ item }) => (
          <FilmCard
            movie={item}
            onTouchEnd={() =>
              navigation.navigate('test', {
                screen: 'save-film',
                params: { id: item.id },
              })
            }
          />
        )}
        ListEmptyComponent={() => (
          <View className='items-center'>
            <Text className='text-muted-foreground'>Bạn chưa có phim nào</Text>
          </View>
        )}
      />
    </Container>
  )
}
