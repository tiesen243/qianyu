import { View } from 'react-native'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { increment, decrement } from '@/redux/slices/counter.slice'

export default function CounterScreen() {
  const counter = useAppSelector((state) => state.counter)
  const dispatch = useAppDispatch()

  return (
    <View className='flex-1 items-center justify-center px-4'>
      <Card>
        <CardHeader>
          <CardTitle>Counter: {counter.value}</CardTitle>
          <CardDescription>
            This is a simple counter example using Redux Toolkit. Press the
            buttons to increment or decrement the counter value.
          </CardDescription>
        </CardHeader>

        <CardContent className='gap-4'>
          <Button variant='outline' onPress={() => dispatch(increment())}>
            <Text>Increment</Text>
          </Button>
          <Button variant='outline' onPress={() => dispatch(decrement())}>
            <Text>Decrement</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  )
}
