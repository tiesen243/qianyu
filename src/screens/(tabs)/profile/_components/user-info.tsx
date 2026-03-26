import { Avatar } from 'heroui-native/avatar'
import { Image, Text, View } from 'react-native'

import { useProfile } from '@/screens/(tabs)/profile/screen.provider'

export const UserInfo: React.FC = () => {
  const { profile } = useProfile()

  return (
    <>
      <View className='h-48 w-full bg-muted'>
        <Image source={{ uri: profile.bannerUrl }} className='h-full w-full' />
      </View>
      <Avatar
        alt='User Avatar'
        className='-mt-16 ml-4 size-24 border-4 border-background'
      >
        <Avatar.Image source={{ uri: profile.avatarUrl }} />
        <Avatar.Fallback>{profile.name.slice(0, 2)}</Avatar.Fallback>
      </Avatar>
      <View className='px-4'>
        <Text className='text-3xl font-bold text-foreground'>
          {profile.name}
        </Text>
        <Text className='mt-1 text-muted'>{profile.description}</Text>
      </View>
    </>
  )
}
