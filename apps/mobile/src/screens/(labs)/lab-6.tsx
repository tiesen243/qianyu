import { Button } from 'heroui-native/button'
import * as React from 'react'
import { FlatList } from 'react-native'

import { Container } from '@/components/container'

export default function Lab6Screen() {
  const [_, triggerRerender] = React.useState(0)

  const onPressItem = React.useCallback((item: string) => {
    console.log('Pressed:', item)
  }, [])

  const rerender = () => {
    console.log('Rerendering parent')
    triggerRerender((prev) => prev + 1)
  }

  return (
    <Container inTab>
      <FlatList
        data={Array.from({ length: 100 }, (__, i) => `Item ${i + 1}`)}
        keyExtractor={(item) => item}
        contentContainerStyle={{ padding: 16, gap: 8 }}
        renderItem={({ item }) => (
          <Child onPressItem={onPressItem}>{item}</Child>
        )}
      />

      <Button onPress={rerender} style={{ margin: 16 }}>
        Rerender Parent
      </Button>
    </Container>
  )
}

interface ChildProps {
  children: React.ReactNode
  onPressItem: (item: string) => void
}

const Child = React.memo(({ children, onPressItem }: ChildProps) => {
  console.log('Rendering:', children)

  return (
    <Button onPress={() => onPressItem(children as string)}>{children}</Button>
  )
})
Child.displayName = 'Child'
