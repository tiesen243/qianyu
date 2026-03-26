import { useNavigation } from '@react-navigation/native'
import { Button } from 'heroui-native/button'
import { EllipsisIcon, PlusIcon } from 'lucide-react-native'
import { View } from 'react-native'

import { Container } from '@/components/container'
import { Icon } from '@/components/ui/icon'
import { EditProfileButton } from '@/screens/(tabs)/profile/_components/edit-profile-button'
import { Posts } from '@/screens/(tabs)/profile/_components/posts'
import { UserInfo } from '@/screens/(tabs)/profile/_components/user-info'
import { ProfileProvider } from '@/screens/(tabs)/profile/screen.provider'

export default function ProfileScreen() {
  const { navigate } = useNavigation()

  return (
    <ProfileProvider>
      <Container>
        <UserInfo />

        <View className='my-4 flex-row items-center justify-center gap-2 px-4'>
          <Button size='sm' className='flex-1'>
            <Icon as={PlusIcon} className='text-accent-foreground' />
            <Button.Label>Add to Story</Button.Label>
          </Button>
          <EditProfileButton />
          <Button
            variant='outline'
            size='sm'
            className='aspect-square'
            onPress={() => navigate('settings')}
          >
            <Icon as={EllipsisIcon} className='text-foreground' />
          </Button>
        </View>

        <Posts />
      </Container>
    </ProfileProvider>
  )
}
