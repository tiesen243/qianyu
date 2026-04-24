import { useQuery } from '@tanstack/react-query'
import { Spinner } from 'heroui-native/spinner'
import { FlatList, Text } from 'react-native'

import type { Movie } from '@/redux/slices/film.slice'

import { Container } from '@/components/container'
import { FilmCard } from '@/screens/(test)/_components/film-card'

const API_URL =
  'https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json'

export default function ExplorerScreen() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('Failed to fetch data')
      return res.json() as Promise<{ movies: Movie[] }>
    },
  })

  if (isLoading)
    return (
      <Container className='flex-1 items-center justify-center'>
        <Spinner />
      </Container>
    )

  if (isError)
    return (
      <Container className='flex-1 items-center justify-center'>
        <Text className='text-destructive'>
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </Text>
      </Container>
    )

  return (
    <Container className='px-4 pb-24'>
      <FlatList
        data={data?.movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerClassName='gap-4'
        columnWrapperClassName='gap-4'
        renderItem={({ item }) => <FilmCard movie={item} />}
      />
    </Container>
  )
}
