import { useTheme } from '@react-navigation/native'
import * as React from 'react'
import { Text } from 'react-native'

import { Container } from '@/components/container'

export default function Lab2Screen() {
  const { colors } = useTheme()
  const [time, setTime] = React.useState(25 * 60)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) return prevTime - 1
        clearInterval(interval)
        return 0
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Container style={{ paddingTop: 16, paddingInline: 16 }} inTab>
      <Text style={{ color: colors.text, fontSize: 48 }}>
        {Math.floor(time / 60)
          .toString()
          .padStart(2, '0')}
        :{(time % 60).toString().padStart(2, '0')}
      </Text>
    </Container>
  )
}
