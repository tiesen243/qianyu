import type { QueryClient } from '@tanstack/react-query'

import { createQueryClient } from '@qianyu/lib/create-query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { HeroUINativeProvider } from 'heroui-native/provider'
import { ToastProvider } from 'heroui-native/toast'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider
        config={{
          devInfo: {
            stylingPrinciples: true,
          },
        }}
      >
        <ToastProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ToastProvider>
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  )
}
