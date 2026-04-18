import { Button } from '@qianyu/ui/button'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@qianyu/ui/field'
import { Input } from '@qianyu/ui/input'
import { Textarea } from '@qianyu/ui/textarea'
import { toast } from '@qianyu/ui/toast'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { api } from '@/lib/api'

export default function CreatePage() {
  const navigate = useNavigate()

  const [data, setData] = useState({ title: '', content: '' })
  const { mutate, isPending } = useMutation({
    ...api.post.create.mutationOptions(),
    onSuccess: () => {
      toast.add({ type: 'success', description: 'Post created successfully!' })
      navigate('/')
    },
    onError: ({ message }) =>
      toast.add({ type: 'error', description: message }),
    meta: {
      filter: { queryKey: api.post.all.queryKey({ page: 1, limit: 12 }) },
    },
  })

  return (
    <main className='container py-4'>
      <h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance'>
        Create a new post
      </h1>

      <form>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                value={data.title}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </Field>

            <Field>
              <FieldLabel>Content</FieldLabel>
              <Textarea
                value={data.content}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, content: e.target.value }))
                }
              />
            </Field>

            <Field>
              <Button onClick={() => mutate(data)} disabled={isPending}>
                {isPending ? 'Creating...' : 'Create Post'}
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </main>
  )
}
