import { render, screen } from '@testing-library/react-native'
import * as React from 'react'
import { View } from 'react-native'

import { Container } from '@/components/container'

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 44, bottom: 34, left: 0, right: 0 }),
}))

jest.mock('heroui-native/utils', () => ({
  cn: (...args: (string | undefined | null | false)[]) =>
    args.filter(Boolean).join(' '),
}))

describe('Container', () => {
  it('renders children', () => {
    render(
      <Container>
        <View testID='child' />
      </Container>
    )
    expect(screen.getByTestId('child')).toBeTruthy()
  })

  it('sets data-slot to "container"', () => {
    render(<Container testID='container' />)
    const el = screen.getByTestId('container')
    expect(el.props['data-slot']).toBe('container')
  })

  it('applies paddingTop from safe area insets when inTab is true', () => {
    render(<Container testID='container' inTab />)
    const el = screen.getByTestId('container')
    expect(el.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ paddingTop: 44 })])
    )
  })

  it('applies paddingTop of 16 when inTab is false', () => {
    render(<Container testID='container' />)
    const el = screen.getByTestId('container')
    expect(el.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ paddingTop: 16 })])
    )
  })

  it('passes additional style props', () => {
    render(<Container testID='container' style={{ margin: 10 }} />)
    const el = screen.getByTestId('container')
    expect(el.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ margin: 10 })])
    )
  })
})
