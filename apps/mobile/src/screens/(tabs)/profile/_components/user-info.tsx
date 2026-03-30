import { Avatar } from 'heroui-native/avatar'
import { Image, Text, View } from 'react-native'

import { useAuth } from '@/components/auth-provider'

export const UserInfo: React.FC = () => {
  const { user } = useAuth()

  return (
    <>
      <View className='h-48 w-full bg-muted'>
        <Image source={{ uri: user.bannerUrl }} className='h-full w-full' />
      </View>
      <Avatar
        alt='User Avatar'
        className='-mt-16 ml-4 size-24 border-4 border-background'
      >
        <Avatar.Image source={{ uri: user.avatarUrl }} />
        <Avatar.Fallback>{user.name.slice(0, 2)}</Avatar.Fallback>
      </Avatar>
      <View className='px-4'>
        <Text className='text-3xl font-bold text-foreground'>{user.name}</Text>
        <Text className='mt-1 text-muted'>{user.description}</Text>
      </View>
    </>
  )
}
