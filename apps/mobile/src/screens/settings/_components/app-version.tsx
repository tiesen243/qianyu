import { Text, View } from 'react-native'

// oxlint-disable-next-line typescript/ban-ts-comment, typescript/prefer-ts-expect-error
// @ts-ignore
import { version } from '@/../package.json' with { type: 'json' }

export const AppVersion: React.FC = () => (
  <View className='gap-4'>
    <Text className='border-b border-border pb-2 text-lg font-medium text-foreground'>
      App Version
    </Text>

    <Text className='text-sm text-muted'>v{version}</Text>
  </View>
)
