import type { ClassValue } from 'cva/types'

import { cx } from 'cva'
import { NativeModules } from 'react-native'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(cx(inputs))
}

export function getBaseUrl() {
  const { scriptURL } = NativeModules.SourceCode.getConstants()

  if (__DEV__ && scriptURL) {
    const { hostname } = new URL(scriptURL)
    return `http://${hostname}:3000`
  }

  return 'https://api.example.com'
}
