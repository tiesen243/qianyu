import { useToast } from 'heroui-native'
import { Button } from 'heroui-native/button'
import { Card } from 'heroui-native/card'
import { Input } from 'heroui-native/input'
import * as React from 'react'
import { FlatList, View } from 'react-native'
import { Config } from 'react-native-config'
import EventSource from 'react-native-sse'

import { Container } from '@/components/container'
import { api } from '@/lib/api'

export default function CharScreen() {
  const [messages, setMessages] = React.useState<string[]>([])
  const [message, setMessage] = React.useState('')
  const { toast } = useToast()

  React.useEffect(() => {
    const es = new EventSource(
      `${new URL(Config.RN_API_URL ?? '').origin}/api/v1/sse`
    )

    es.addEventListener('message', (event) => {
      if (event.data === 'keep-alive') return
      setMessages((prev) => [...prev, event.data ?? ''])
    })

    es.addEventListener('error', (event) => {
      console.error('SSE error:', event)
      es.close()
    })

    return () => es.close()
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
