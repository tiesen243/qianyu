import type { QueryClient } from '@tanstack/react-query'

import { createQueryClient } from '@qianyu/lib/create-query-client'
import { ThemeProvider } from '@qianyu/ui'
import { QueryClientProvider } from '@tanstack/react-query'

let clientQueryClientSingleton: QueryClient | undefined
const getQueryClient = () => {
  if (typeof window === 'undefined') return createQueryClient()
  return (clientQueryClientSingleton ??= createQueryClient())
}

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient()

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      disableTransitionOnChange
      enableSystem
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  )
}
