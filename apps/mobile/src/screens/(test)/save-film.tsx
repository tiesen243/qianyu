import type { StaticScreenProps } from '@react-navigation/native'

import { useNavigation } from '@react-navigation/native'
import { Button } from 'heroui-native/button'
import { Input } from 'heroui-native/input'
import { Label } from 'heroui-native/label'
import { TextField } from 'heroui-native/text-field'
import { useToast } from 'heroui-native/toast'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'

import type { Movie } from '@/redux/slices/film.slice'

import { Container } from '@/components/container'
import { useDispatch, useSelector } from '@/redux/hook'
import { addFilm, deleteFilm } from '@/redux/slices/film.slice'

const DEFAULT_DATA: Omit<Movie, 'id' | 'genres'> & { genres: string } = {
  title: '',
  year: '',
  runtime: '',
  genres: '',
  director: '',
  actors: '',
  plot: '',
  posterUrl: '',
}

export default function SaveFilmScreen({
  route,
}: StaticScreenProps<{
  id?: Movie['id']
}>) {
  const { id } = route.params
  const film = useSelector((state) =>
    state.film.movies.find((movie) => movie.id === id)
  )

  const { toast } = useToast()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [data, setData] = useState(DEFAULT_DATA)

  useEffect(() => {
    if (film) {
      setData({ ...film, genres: film.genres.join(', ') })
      navigation.setOptions({ title: `Chỉnh sửa phim: ${film.title}` })
    } else navigation.setOptions({ title: 'Thêm phim mới' })
  }, [film, navigation])

  const handleSubmit = () => {
    if (Object.values(data).some((value) => value?.trim() === ''))
      return toast.show({
        variant: 'danger',
        label: 'Vui lòng điền đầy đủ thông tin',
      })

    if (Number.isNaN(Number(data.year)))
      return toast.show({
        variant: 'danger',
        label: 'Năm phải là một số',
      })

    if (Number.isNaN(Number(data.runtime)))
      return toast.show({
        variant: 'danger',
        label: 'Thời lượng phải là một số',
      })

    const genres = data.genres.split(', ').map((genre) => genre.trim())
    if (genres.some((genre) => genre === ''))
      return toast.show({
        variant: 'danger',
        label: 'Thể loại không được để trống',
      })

    const url = new URL(data.posterUrl ?? '')
    if (!['http:', 'https:'].includes(url.protocol))
      return toast.show({
        variant: 'danger',
        label: 'URL poster không hợp lệ',
      })

    dispatch(addFilm({ ...data, genres }))
    setData(DEFAULT_DATA)
    navigation.goBack()
    toast.show({
      variant: 'success',
      label: 'Thêm phim thành công',
    })
  }

  const handleDelete = () => {
    if (!id)
      return toast.show({
        variant: 'danger',
        label: 'Không tìm thấy phim',
      })

    dispatch(deleteFilm(id))
    navigation.goBack()
    toast.show({
      variant: 'success',
      label: 'Xóa phim thành công',
    })
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <Container className='px-4 pb-6'>
          <Text className='text-2xl font-bold text-foreground'>
            {id ? `Chỉnh sửa phim: ${film?.title}` : 'Thêm phim mới'}
          </Text>

          <View className='gap-4'>
            {fields.map((field) => (
              <TextField key={field.name}>
                <Label>{field.label}</Label>
                <Input
                  placeholder={field.placeholder}
                  value={data[field.name]}
                  onChangeText={(text) =>
                    setData((prev) => ({ ...prev, [field.name]: text }))
                  }
                />
              </TextField>
            ))}

            <View className='flex-row items-center gap-4'>
              <Button className='flex-2' onPress={handleSubmit}>
                {id ? 'Lưu thay đổi' : 'Thêm phim'}
              </Button>

              {id && (
                <Button
                  variant='danger-soft'
                  className='flex-1'
                  onPress={handleDelete}
                >
                  Xóa phim
                </Button>
              )}
            </View>
          </View>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const fields = [
  { name: 'title', label: 'Tiêu đề', placeholder: 'Nhập tiêu đề phim' },
  { name: 'year', label: 'Năm', placeholder: 'Nhập năm phát hành' },
  { name: 'runtime', label: 'Thời lượng', placeholder: 'Nhập thời lượng phim' },
  { name: 'genres', label: 'Thể loại', placeholder: 'Nhập thể loại phim' },
  { name: 'director', label: 'Đạo diễn', placeholder: 'Nhập tên đạo diễn' },
  { name: 'actors', label: 'Diễn viên', placeholder: 'Nhập tên diễn viên' },
  { name: 'plot', label: 'Nội dung', placeholder: 'Nhập nội dung phim' },
  {
    name: 'posterUrl',
    label: 'URL poster',
    placeholder: 'Nhập URL poster phim',
  },
] as const
