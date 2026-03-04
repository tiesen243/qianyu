import type { VariantProps } from 'cva'
import type { Role } from 'react-native'

import { cva } from 'cva'
import * as React from 'react'
import { Text as RNText } from 'react-native'

import { cn } from '@/lib/utils'

const textVariants = cva('text-base text-foreground web:select-text', {
  variants: {
    variant: {
      h1: 'my-8 text-4xl font-extrabold tracking-tight web:scroll-m-20 web:text-balance',
      h2: 'my-5 text-3xl font-bold tracking-tight web:scroll-m-20 web:text-balance web:first:mt-0',
      h3: 'my-4 text-2xl font-semibold tracking-tight web:scroll-m-20 web:text-balance',
      h4: 'my-3 text-xl font-semibold tracking-tight web:scroll-m-20 web:text-balance',
      h5: 'my-2.5 text-lg font-medium tracking-tight web:scroll-m-20 web:text-balance',
      h6: 'my-2 text-base font-medium tracking-tight web:scroll-m-20 web:text-balance',
      p: 'leading-7 text-pretty web:not-first:mt-2',
      small: 'text-sm leading-none font-medium',
      ul: 'my-4 ml-6 list-disc text-base [&>li]:mt-2 [&>li]:first:mt-0',
      ol: 'my-4 ml-6 list-decimal text-base [&>li]:mt-2 [&>li]:first:mt-0',
      blockquote:
        'my-2 inline-flex border-l-2 pl-6 italic web:before:content-["“"] web:after:content-["”"]',
      code: 'relative w-fit rounded-sm border border-accent bg-accent/40 px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium text-accent-foreground',
      caption: 'block text-sm tracking-wide',
    },
  },
})

type TextVariantProps = VariantProps<typeof textVariants>
type TextVariant = NonNullable<TextVariantProps['variant']>

const ROLE: Partial<Record<TextVariant, Role>> = {
  h1: 'heading',
  h2: 'heading',
  h3: 'heading',
  h4: 'heading',
  h5: 'heading',
  h6: 'heading',
  blockquote: 'blockquote' as Role,
  ul: 'list',
  ol: 'list',
  code: 'code' as Role,
}

const ARIA_LEVEL: Partial<Record<TextVariant, string>> = {
  h1: '1',
  h2: '2',
  h3: '3',
  h4: '4',
  h5: '5',
  h6: '6',
}

const TextContext = React.createContext<string | null>(null)

function TextProvider({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className: string }>) {
  return <TextContext value={className}>{children}</TextContext>
}

interface TextProps
  extends React.ComponentProps<typeof RNText>, TextVariantProps {}

function Text({ className = '', variant = 'p', ...props }: TextProps) {
  const context = React.use(TextContext)

  return (
    <RNText
      data-slot='text'
      role={variant ? ROLE[variant] : undefined}
      aria-level={variant ? ARIA_LEVEL[variant] : undefined}
      className={cn(textVariants({ variant }), className, context)}
      {...props}
    />
  )
}

export { TextProvider, Text }
