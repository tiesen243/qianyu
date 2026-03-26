import { useTheme } from '@react-navigation/native'
import { Text, View } from 'react-native'

export default function IndexScreen() {
  const { colors } = useTheme()

  return (
    <View className='flex-1 items-center justify-center gap-4 px-4'>
      <Text className='text-2xl font-bold' style={{ color: colors.text }}>
        Welcome to the Qianyu!
      </Text>
    </View>
  )
}
