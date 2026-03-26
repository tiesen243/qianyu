import { cn } from 'heroui-native/utils'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function Container({
  className,
  style,
  ...props
}: React.ComponentProps<typeof View>) {
  const insets = useSafeAreaInsets()

  return (
    <View
      {...props}
      data-slot='container'
      className={cn('flex-1 gap-6 bg-background', className)}
      style={[{ paddingTop: insets.top }, style]}
    />
  )
}
