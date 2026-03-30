import type { Post } from '@qianyu/api/models/post'

import { Button } from '@qianyu/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@qianyu/ui/card'
import { XIcon } from '@qianyu/ui/icon'
import { toast } from '@qianyu/ui/toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router'

import { api } from '@/lib/api'

import type { Route } from './+types/_index'

export default function IndexPage(_: Route.ComponentProps) {
  return (
    <main className='container py-4'>
      <h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance'>
        Welcome to Qianyu!
      </h1>

      <div className='my-4 flex items-center justify-end'>
        <Button nativeButton={false} render={<Link to='/posts/create' />}>
          Create a new post
        </Button>
      </div>

      <section className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <PostList />
      </section>
    </main>
  )
}

const PostList: React.FC = () => {
  const { data, isLoading } = useQuery(api.post.all.queryOptions({}))

  if (isLoading || !data)
    return Array.from({ length: 6 }, (_, i) => (
      <Card key={i} className='animate-pulse'>
        <CardHeader>
          <CardTitle className='w-1/2 rounded bg-current/80'>&nbsp;</CardTitle>
        </CardHeader>

        <CardContent className='flex-1'>
          <div className='mb-1 w-full rounded bg-current/80'>&nbsp;</div>
          <div className='w-5/6 rounded bg-current/80'>&nbsp;</div>
        </CardContent>

        <CardFooter className='justify-end'>
          <Button variant='link' disabled>
            View Details
          </Button>
        </CardFooter>
      </Card>
    ))

  return data.posts.map((_post) => <PostCard key={_post.id} post={_post} />)
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    ...api.post.delete.mutationOptions(),
    onSuccess: () =>
      toast.add({ type: 'success', description: 'Post deleted successfully!' }),
    onError: ({ message }) =>
      toast.add({ type: 'error', description: message }),
    meta: { filter: { queryKey: api.post.all.queryKey({}) } },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardAction>
          <Button
            variant='ghost'
            size='icon-sm'
            onClick={() => mutate({ id: post.id })}
            disabled={isPending}
          >
            <XIcon />
            <span className='sr-only'>Delete post {post.id}</span>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className='line-clamp-2 flex-1'>{post.content}</CardContent>

      <CardFooter className='justify-end'>
        <Button variant='link' onClick={() => navigate(`/posts/${post.id}`)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
