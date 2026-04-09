import { Button } from '@qianyu/ui/button'
import { Input } from '@qianyu/ui/input'
import { Item, ItemContent, ItemGroup, ItemTitle } from '@qianyu/ui/item'
import { ScrollArea } from '@qianyu/ui/scroll-area'
import { toast } from '@qianyu/ui/toast'
import { useMutation } from '@tanstack/react-query'
import * as React from 'react'

import { api } from '@/lib/api'

export default function SSEPage() {
  const [messages, setMessages] = React.useState<string[]>([])
  const [message, setMessage] = React.useState('')
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const es = new EventSource(`${import.meta.env.VITE_API_URL}/api/v1/sse`)

    es.addEventListener('message', (event) => {
      if (event.data === 'keep-alive') return
      setMessages((prev) => [...prev, event.data])
    })

    es.addEventListener('error', (event) => {
      console.error('SSE error:', event)
      es.close()
    })

    return () => es.close()
  }, [])

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const { mutate, isPending } = useMutation({
    ...api.sse.send.mutationOptions(),
    onSettled: () => setMessage(''),
    onSuccess: () =>
      toast.add({
        type: 'success',
        title: 'Message sent successfully',
      }),
    onError: (error) =>
      toast.add({
        type: 'error',
        title: 'Failed to send message',
        description: error.message,
      }),
  })

  return (
    <section className='container flex h-[calc(100dvh-3.5rem)] flex-col py-4'>
      <h1 className='mb-4 text-2xl font-bold'>Server-Sent Events (SSE) Demo</h1>

      <ScrollArea className='max-h-[calc(100dvh-11.5rem)] flex-1'>
        <ItemGroup>
          {messages.map((msg, idx) => (
            // oxlint-disable-next-line react/no-array-index-key
            <Item key={idx} variant='outline'>
              <ItemContent>
                <ItemTitle>{msg}</ItemTitle>
              </ItemContent>
            </Item>
          ))}

          <div ref={messagesEndRef} />
        </ItemGroup>
      </ScrollArea>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          mutate({ message })
        }}
        className='mt-4 flex items-center gap-2'
      >
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type a message to send to SSE clients'
          disabled={isPending}
        />
        <Button type='submit' disabled={isPending || !message.trim()}>
          Send
        </Button>
      </form>
    </section>
  )
}
