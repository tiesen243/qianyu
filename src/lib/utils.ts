import type { ClassValue } from 'cva/types'

import { cx } from 'cva'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(cx(inputs))
}
