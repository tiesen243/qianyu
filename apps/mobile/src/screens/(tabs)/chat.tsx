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

    xhr.open('GET', `${new URL(Config.RN_API_URL ?? '').origin}/api/v1/sse`)
    xhr.setRequestHeader('Accept', 'text/event-stream')

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState !== 3) return

      const { responseText } = xhr
      const newChunk = responseText.slice(processedIndex)
      processedIndex = responseText.length

      const lines = newChunk.split('\n')
      for (const line of lines) {
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

  const sendMessage = React.useCallback(async () => {
    const { error } = await api.client.v1.sse.post({ message })
    if (error) toast.show(error.value.message ?? 'Failed to send message')
    else setMessage('')
  }, [message, toast])

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

        <Button onPress={sendMessage}>Send</Button>
      </View>
    </Container>
  )
}
