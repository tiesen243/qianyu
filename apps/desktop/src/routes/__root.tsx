import '@/globals.css'

import { Button } from '@qianyu/ui/button'
import { getVersion } from '@tauri-apps/api/app'
import { Link, Outlet, useLoaderData } from 'react-router'

import { Providers } from '@/components/providers'

export const loader = async () => ({
  version: await getVersion(),
})

export default function RootLayout() {
  const { version } = useLoaderData<typeof loader>()

  return (
    <Providers>
      <header className='sticky inset-0 flex h-14 items-center border-b bg-popover text-popover-foreground'>
        <div className='container flex items-center justify-between gap-4'>
          <h1 className='inline-flex items-center gap-2 text-2xl font-bold'>
            Qianyu
            <span className='text-sm font-normal text-muted-foreground'>
              v{version}
            </span>
          </h1>

          <nav>
            {navItems.map(({ label, to }) => (
              <Button
                key={to}
                variant='link'
                render={<Link to={to} />}
                nativeButton={false}
              >
                {label}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <main className='min-h-[calc(100dvh-3.5rem)] bg-background font-sans text-foreground antialiased'>
        <Outlet />
      </main>
    </Providers>
  )
}

const navItems = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Chat',
    to: '/chat',
  },
  {
    label: 'Serial Monitor',
    to: '/serial-monitor',
  },
]
