import { Button, Text, View } from 'react-native'

import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { increment, decrement } from '../../redux/slices/counter.slice'

export default function CounterScreen() {
  const counter = useAppSelector((state) => state.counter)
  const dispatch = useAppDispatch()

  return (
    <View>
      <Text>Counter Screen</Text>
      <Text style={{ color: 'white' }}>Counter: {counter?.value}</Text>

      <Button title='Increment' onPress={() => dispatch(increment())} />

      <Button title='Decrement' onPress={() => dispatch(decrement(2))} />
    </View>
  )
}
