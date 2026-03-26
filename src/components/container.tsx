import { cn } from 'heroui-native/utils'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function Container({
  className,
  style,
  inTab = false,
  ...props
}: React.ComponentProps<typeof View> & { inTab?: boolean }) {
  const insets = useSafeAreaInsets()

  return (
    <View
      {...props}
      data-slot='container'
      style={[{ paddingTop: inTab ? insets.top : 16 }, style]}
      className={cn('flex-1 gap-6 bg-background', inTab && 'pb-28', className)}
    />
  )
}
