import '@/globals.css'

import { Button } from '@qianyu/ui/button'
import { Link, Outlet } from 'react-router'

import { Providers } from '@/components/providers'

export default function RootLayout() {
  return (
    <Providers>
      <header className='sticky inset-0 flex h-14 items-center border-b bg-popover text-popover-foreground'>
        <div className='container flex items-center justify-between gap-4'>
          <h1 className='text-2xl font-bold'>Qianyu</h1>

          <nav>
            <Button variant='link' render={<Link to='/' />}>
              Home
            </Button>
            <Button variant='link' render={<Link to='/chat' />}>
              Chat
            </Button>
          </nav>
        </div>
      </header>

      <main className='min-h-[calc(100dvh-3.5rem)] bg-background font-sans text-foreground antialiased'>
        <Outlet />
      </main>
    </Providers>
  )
}
