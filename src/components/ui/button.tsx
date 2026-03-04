import type { VariantProps } from 'cva'

import { cva } from 'cva'
import { TouchableOpacity } from 'react-native'

import { TextProvider } from '@/components/ui/text'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding transition-all outline-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 web:focus-visible:border-ring web:focus-visible:ring-[3px] web:focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary',
        outline:
          'border-border bg-background shadow-xs dark:border-input dark:bg-input/30 web:hover:bg-muted web:dark:hover:bg-input/50',
        secondary: 'bg-secondary web:hover:bg-secondary/80',
        ghost:
          'web:hover:bg-muted web:hover:text-foreground web:dark:hover:bg-muted/50',
        destructive:
          'bg-destructive/10 dark:bg-destructive/20 web:hover:bg-destructive/20 web:focus-visible:border-destructive/40 web:focus-visible:ring-destructive/20 web:dark:hover:bg-destructive/30 web:dark:focus-visible:ring-destructive/40',
        link: '',
      },
      size: {
        default: 'h-9 gap-1.5 px-2.5',
        xs: '.5 h-6 gap-1 rounded-md px-2',
        sm: 'h-8 gap-1 rounded-lg px-2.5',
        lg: 'h-10 gap-1.5 px-2.5',
        icon: 'size-9',
        'icon-xs': 'size-6 rounded-md',
        'icon-sm': 'size-8 rounded-lg',
        'icon-lg': 'size-10',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const buttonTextVariants = cva(
  'my-0 text-sm font-medium whitespace-nowrap web:select-none',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        outline: 'text-foreground',
        secondary: 'text-secondary-foreground',
        ghost: 'text-foreground',
        destructive: 'text-destructive',
        link: 'text-primary',
      },
    },

    defaultVariants: {
      variant: 'default',
    },
  }
)

interface ButtonProps
  extends
    React.ComponentProps<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {}

function Button({
  className = '',
  variant = 'default',
  size = 'default',
  activeOpacity = 0.8,
  ...props
}: ButtonProps) {
  return (
    <TextProvider
      className={cn(buttonTextVariants({ variant }), {
        'text-xs': size === 'xs',
      })}
    >
      <TouchableOpacity
        data-slot='button'
        className={cn(buttonVariants({ variant, size }), className)}
        activeOpacity={activeOpacity}
        {...props}
      />
    </TextProvider>
  )
}

export { Button, buttonVariants }
