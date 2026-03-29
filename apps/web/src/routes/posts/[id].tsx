import { Badge } from '@qianyu/ui/badge'
import { Button } from '@qianyu/ui/button'
import { ChevronLeftIcon } from '@qianyu/ui/icon'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'

import { api } from '@/lib/api'

import type { Route } from './+types/[id]'

export default function PostDetailPage({ params }: Route.ComponentProps) {
  return (
    <main className='container py-4'>
      <Button variant='link' nativeButton={false} render={<Link to='/' />}>
        <ChevronLeftIcon data-icon='inline-start' /> Back
      </Button>

      <article>
        <PostDetails id={Number(params.id)} />
      </article>
    </main>
  )
}

const PostDetails: React.FC<{ id: number }> = ({ id }) => {
  const { data, isLoading, error } = useQuery(api.post.one.queryOptions({ id }))

  if (isLoading)
    return (
      <>
        <h1 className='mx-auto w-1/2 animate-pulse rounded bg-current/80 text-4xl font-extrabold tracking-tight'>
          &nbsp;
        </h1>

        <div className='mt-2 flex animate-pulse flex-wrap items-center gap-2'>
          {Array.from({ length: 3 }, (_, i) => (
            <Badge key={i} variant='outline' className='w-16 bg-current/80'>
              &nbsp;
            </Badge>
          ))}
        </div>

        <hr className='my-4' />

        <p className='h-48 w-full animate-pulse rounded bg-current/80'>
          &nbsp;
        </p>
      </>
    )

  if (error || !data)
    return (
      <h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance text-destructive'>
        {error?.message ?? 'Failed to load post details.'}
      </h1>
    )

  return (
    <>
      <h1 className='scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance'>
        {data.title}
      </h1>

      <hr className='my-4' />

      <p>{data.content}</p>
    </>
  )
}
