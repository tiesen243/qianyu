import type { CardRootProps } from 'heroui-native/card'

import { Card } from 'heroui-native/card'
import { cn } from 'heroui-native/utils'
import { Image, Text } from 'react-native'

import type { Movie } from '@/redux/slices/film.slice'

export const FilmCard: React.FC<CardRootProps & { movie: Movie }> = ({
  movie,
  className,
  ...props
}) => (
  <Card className={cn('flex-1', className)} {...props}>
    <Image
      source={{
        uri: movie.posterUrl ?? 'https://picsum.photos/200',
      }}
      className='size-40 rounded-lg'
      resizeMode='cover'
    />

    <Card.Body>
      <Card.Title numberOfLines={1}>{movie.title}</Card.Title>
      <Card.Description>{movie.year}</Card.Description>
    </Card.Body>
    <Card.Footer>
      <Text className='text-sm text-muted-foreground'>
        {movie.genres.join(', ')}
      </Text>
    </Card.Footer>
  </Card>
)
