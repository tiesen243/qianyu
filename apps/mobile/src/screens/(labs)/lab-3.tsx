import { Button } from 'heroui-native/button'
import { Card } from 'heroui-native/card'
import { Checkbox } from 'heroui-native/checkbox'
import { Input } from 'heroui-native/input'
import * as React from 'react'
import { FlatList, Text, View } from 'react-native'

import { Container } from '@/components/container'

interface Todo {
  id: number
  text: string
  completed: boolean
}

type Action =
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: number } }
  | { type: 'DELETE_TODO'; payload: { id: number } }

const reducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.text,
        completed: false,
      }
      return [...state, newTodo]
    }
    case 'TOGGLE_TODO': {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    }
    case 'DELETE_TODO': {
      return state.filter((todo) => todo.id !== action.payload.id)
    }
    default: {
      return state
    }
  }
}

export default function Lab3Screen() {
  const [state, dispatch] = React.useReducer(reducer, [])
  const [todo, setTodo] = React.useState('')

  return (
    <Container style={{ paddingTop: 16, paddingInline: 16 }} inTab>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
        <Input
          placeholder='Thêm công việc...'
          value={todo}
          onChange={(e) => setTodo(e.nativeEvent.text)}
          style={{ flex: 1 }}
        />
        <Button
          onPress={() => {
            dispatch({ type: 'ADD_TODO', payload: { text: todo } })
            setTodo('')
          }}
        >
          Thêm
        </Button>
      </View>

      <FlatList
        data={state}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flex: 1, gap: 8 }}
        renderItem={({ item }) => (
          <Card>
            <Card.Header>
              <Card.Title>{item.text}</Card.Title>
              <Card.Footer
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
              >
                <Checkbox
                  isSelected={item.completed}
                  onSelectedChange={() =>
                    dispatch({ type: 'TOGGLE_TODO', payload: { id: item.id } })
                  }
                />
                <Text className='text-foreground'>
                  {item.completed ? 'Hoàn thành' : 'Chưa hoàn thành'}
                </Text>
              </Card.Footer>
            </Card.Header>
          </Card>
        )}
      />
    </Container>
  )
}
