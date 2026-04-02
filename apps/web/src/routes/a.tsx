import { useEffect } from 'react'

export default function APage() {
  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_URL}api/v1/chats/sse`
    )

    eventSource.addEventListener('message', (event) => {
      console.log('Received message:', event.data)
    })

    eventSource.addEventListener('error', (event) => {
      console.error('EventSource error:', event)
    })

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div>
      <h1>APage</h1>
    </div>
  )
}
