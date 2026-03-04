import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { logout } from '@/redux/slices/auth.slice'

export default function IndexScreen() {
  const auth = useAppSelector((state) => state.auth)
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-2xl font-bold'>Welcome to the Home Screen!</Text>

      {auth.isAuthenticated ? (
        <>
          <Text className='mt-4 text-lg'>Hello, {auth.user?.name}!</Text>
          <Button
            variant='destructive'
            size='sm'
            onPress={() => dispatch(logout())}
          >
            <Text>Logout</Text>
          </Button>
        </>
      ) : (
        <>
          <Text className='mt-4 text-lg'>You are not logged in.</Text>
          <Button size='sm' onPress={() => navigation.navigate('login')}>
            <Text>Login</Text>
          </Button>
        </>
      )}
    </View>
  )
}
