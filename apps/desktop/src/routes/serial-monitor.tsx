import { Badge } from '@qianyu/ui/badge'
import { Button } from '@qianyu/ui/button'
import { Input } from '@qianyu/ui/input'
import { Item, ItemContent, ItemGroup, ItemTitle } from '@qianyu/ui/item'
import { ScrollArea } from '@qianyu/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@qianyu/ui/select'
import * as React from 'react'
import { useLoaderData } from 'react-router'
import { SerialPort } from 'tauri-plugin-serialplugin-api'

import type { BaudRate } from '@/hooks/use-uart'

import { baudRates, useUART } from '@/hooks/use-uart'

export const loader = async () => {
  const ports = await SerialPort.available_ports()
  const serializedPorts = Object.entries(ports)
    .filter(([path]) => !path.startsWith('/dev/ttyS'))
    .map(([path, info]) => ({
      ...info,
      path,
    }))

  if (serializedPorts.length === 0)
    console.warn(
      'No serial ports found. Please connect a device and refresh the page.'
    )

  return {
    ports: serializedPorts,
  }
}

export default function SerialMonitorPage() {
  const { ports } = useLoaderData<typeof loader>()
  const [port, setPort] = React.useState<string | null>(null)
  const [baudRate, setBaudRate] = React.useState<BaudRate>('9600')

  const [message, setMessage] = React.useState('')
  const [messages, setMessages] = React.useState<string[]>([])
  const bottomRef = React.useRef<HTMLDivElement>(null)

  const { status, connect, disconnect, subscribe, send } = useUART()

  React.useEffect(() => {
    if (status.type !== 'connected') return

    const unsubscribe = subscribe((data) => {
      setMessages((prev) => [...prev, data])
    })

    // oxlint-disable-next-line promise/prefer-await-to-then
    return () => void unsubscribe.then((unsub) => unsub?.())
  }, [status, subscribe])

  React.useEffect(() => {
    if (!bottomRef.current) return
    bottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = React.useCallback(
    async (e: React.SubmitEvent) => {
      e.preventDefault()
      if (message.trim() === '' || status.type !== 'connected') return

      await send(message)
      setMessage('')
    },
    [message, send, status]
  )

  return (
    <section className='container flex h-[calc(100dvh-3.5rem)] flex-col gap-4 py-4'>
      <h1 className='mb-4 text-2xl font-bold'>Serial Monitor</h1>

      <section className='flex items-center gap-2'>
        <h2 className='sr-only'>Connection section</h2>

        <Select
          value={port}
          onValueChange={setPort}
          disabled={status.type === 'connected'}
        >
          <SelectTrigger className='flex-1'>
            <SelectValue placeholder='Select a serial port' />
          </SelectTrigger>
          <SelectContent>
            {ports.map(({ path, manufacturer }) => (
              <SelectItem key={path} value={path}>
                {path} - {manufacturer ?? 'Unknown'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={baudRate}
          onValueChange={setBaudRate as never}
          disabled={status.type === 'connected'}
        >
          <SelectTrigger className='w-32'>
            <SelectValue placeholder='Select baud rate' />
          </SelectTrigger>
          <SelectContent>
            {baudRates.map((rate) => (
              <SelectItem key={rate} value={rate}>
                {rate} bps
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {status.type === 'connected' ? (
          <Button variant='destructive' onClick={disconnect}>
            Disconnect
          </Button>
        ) : (
          <Button
            onClick={() => connect(port, baudRate)}
            disabled={!port || !baudRate}
          >
            Connect
          </Button>
        )}
      </section>

      <section>
        <span className='flex items-center gap-2'>
          Status: <Badge variant={variantMap[status.type]}>{status.type}</Badge>
        </span>
        {status.type === 'error' && (
          <p className='text-destructive'> {status.message}</p>
        )}
      </section>

      <form onSubmit={handleSend} className='flex items-center gap-2'>
        <Input value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button
          type='submit'
          disabled={status.type !== 'connected' || message.trim() === ''}
        >
          Send
        </Button>
      </form>

      <ScrollArea className='h-full max-h-full overflow-hidden rounded-xl border p-4'>
        <ItemGroup>
          {messages.map((msg, index) => (
            // oxlint-disable-next-line react/no-array-index-key
            <Item key={index} variant='outline'>
              <ItemContent>
                <ItemTitle>{msg}</ItemTitle>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>

        <div ref={bottomRef} />
      </ScrollArea>
    </section>
  )
}

const variantMap = {
  idle: 'info',
  connecting: 'warning',
  connected: 'success',
  error: 'destructive',
} as const
