import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Text } from '@/components/ui/text'
import { useForm } from '@/hooks/use-form'
import { useAppDispatch } from '@/redux/hooks'
import { login } from '@/redux/slices/auth.slice'

export default function LoginScreen() {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: ({ email }) => {
      dispatch(
        login({
          id: Math.random().toString(36).slice(2, 10),
          name: email.split('@')[0] ?? 'User',
        })
      )
      navigation.navigate('tabs', { screen: 'index' })
    },
  })

  return (
    <View className='flex-1 items-center justify-center px-4'>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Fill in your credentials to access your account. This is a
            placeholder screen for the login functionality.
          </CardDescription>
        </CardHeader>

        <CardContent className='gap-4'>
          <form.Field
            name='email'
            render={({ field: { value, onChange } }) => (
              <View className='gap-2'>
                <Label>Email</Label>
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder='Enter your email'
                />
              </View>
            )}
          />

          <form.Field
            name='password'
            render={({ field: { value, onChange } }) => (
              <View className='gap-2'>
                <Label>Password</Label>
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder='Enter your password'
                  secureTextEntry
                />
              </View>
            )}
          />
        </CardContent>

        <CardFooter>
          <Button onPress={() => form.handleSubmit()}>
            <Text>Login</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  )
}
