import { useMutation } from '@tanstack/react-query'
import { useToast } from 'heroui-native'
import { Button } from 'heroui-native/button'
import { Card } from 'heroui-native/card'
import { Input } from 'heroui-native/input'
import * as React from 'react'
import { FlatList, View } from 'react-native'
import { Config } from 'react-native-config'

import { Container } from '@/components/container'
import { api } from '@/lib/api'

export default function CharScreen() {
  const [messages, setMessages] = React.useState<string[]>([])
  const [message, setMessage] = React.useState('')
  const { toast } = useToast()

  React.useEffect(() => {
    const xhr = new XMLHttpRequest()
    let processedIndex = 0

    xhr.open('GET', `${Config.PUBLIC_API_URL}/api/v1/chat`)
    xhr.setRequestHeader('Accept', 'text/event-stream')
    xhr.timeout = 35_000

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState !== 3) return

      const { responseText } = xhr
      const newChunk = responseText.slice(processedIndex)
      processedIndex = responseText.length

      const lines = newChunk.split('\n')
      for (const line of lines) {
        console.log(line)

        if (line.startsWith('data:')) {
          const data = line.replace('data:', '').trim()
          if (data === 'keep-alive') continue
          if (data) setMessages((prev) => [...prev, data])
        }
      }
    })

    xhr.addEventListener('error', (err) => console.error('SSE XHR error:', err))
    xhr.send()

    return () => xhr.abort()
  }, [])

  const { mutate, isPending } = useMutation({
    ...api.chat.send.mutationOptions(),
    onSettled: () => setMessage(''),
    onSuccess: () => toast.show('Message sent successfully'),
    onError: (error) => toast.show(`Failed to send message: ${error.message}`),
  })

  return (
    <Container inTab>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        contentContainerClassName='p-4 gap-4'
        renderItem={({ item }) => (
          <Card>
            <Card.Body>
              <Card.Title>{item}</Card.Title>
            </Card.Body>
          </Card>
        )}
      />

      <View className='flex-row items-center gap-2 px-4'>
        <Input
          className='flex-1'
          placeholder='Type a message...'
          value={message}
          onChangeText={setMessage}
        />

        <Button
          onPress={() => mutate({ message })}
          isDisabled={isPending || !message.trim()}
        >
          Send
        </Button>
      </View>
    </Container>
  )
}
