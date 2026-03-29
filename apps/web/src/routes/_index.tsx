import { Badge } from '@qianyu/ui/badge'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@qianyu/ui/card'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { api } from '@/lib/api'

import type { Route } from './+types/_index'

export default function IndexPage(_: Route.ComponentProps) {
  return (
    <main className='container py-4'>
      <h1 className='text-center text-xl font-bold'>Welcome to Qianyu</h1>

      <section className='grid gap-4 py-4 md:grid-cols-2 lg:grid-cols-3'>
        <PostList />
      </section>
    </main>
  )
}

const PostList: React.FC = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useQuery(
    api.post.all.queryOptions({ page: 1, limit: 6 })
  )

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

        <CardFooter className='flex-wrap gap-2'>
          {Array.from({ length: 3 }, (__, j) => (
            <Badge key={j} variant='outline' className='w-16 bg-current/80'>
              &nbsp;
            </Badge>
          ))}
        </CardFooter>
      </Card>
    ))

  return data.posts.map((_post) => (
    <Card
      key={_post.id}
      className='cursor-pointer hover:bg-secondary'
      onClick={() => navigate(`/posts/${_post.id}`)}
    >
      <CardHeader>
        <CardTitle>{_post.title}</CardTitle>
      </CardHeader>

      <CardContent className='line-clamp-2 flex-1'>{_post.title}</CardContent>
    </Card>
  ))
}
