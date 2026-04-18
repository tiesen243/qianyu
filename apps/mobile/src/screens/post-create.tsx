import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { Button } from 'heroui-native/button'
import { Input } from 'heroui-native/input'
import { Label } from 'heroui-native/label'
import { TextArea } from 'heroui-native/text-area'
import { TextField } from 'heroui-native/text-field'
import { useToast } from 'heroui-native/toast'
import { useState } from 'react'

import { Container } from '@/components/container'
import { api } from '@/lib/api'

export default function PostCreateScreen() {
  const navigation = useNavigation()
  const { toast } = useToast()

  const [data, setData] = useState({ title: '', content: '' })
  const { mutate, isPending } = useMutation({
    ...api.post.create.mutationOptions(),
    onError: ({ message }) => toast.show(message),
    onSuccess: () => {
      toast.show('Post created successfully!')
      navigation.goBack()
    },
    meta: {
      filter: {
        queryKey: api.post.all.queryKey({
          page: 1,
          limit: 12,
        }),
      },
    },
  })

  return (
    <Container className='gap-4 px-4'>
      <TextField>
        <Label>Title</Label>

        <Input
          placeholder='Enter post title'
          value={data.title}
          onChangeText={(text) => setData((prev) => ({ ...prev, title: text }))}
        />
      </TextField>

      <TextField>
        <Label>Content</Label>

        <TextArea
          placeholder='Enter post content'
          value={data.content}
          onChangeText={(text) =>
            setData((prev) => ({ ...prev, content: text }))
          }
        />
      </TextField>

      <Button
        onPress={() => mutate(data)}
        isDisabled={isPending || !data.title || !data.content}
      >
        Create Post
      </Button>
    </Container>
  )
}
