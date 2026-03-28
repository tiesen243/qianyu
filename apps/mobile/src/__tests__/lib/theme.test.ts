import { DarkTheme, LightTheme } from '@/lib/theme'

describe('LightTheme', () => {
  it('has dark set to false', () => {
    expect(LightTheme.dark).toBe(false)
  })

  it('has the expected background color', () => {
    expect(LightTheme.colors.background).toBe('#fafafa')
  })

  it('has the expected card color', () => {
    expect(LightTheme.colors.card).toBe('#ffffff')
  })

  it('has the expected primary color', () => {
    expect(LightTheme.colors.primary).toBe('#3f5ec2')
  })

  it('has the expected border color', () => {
    expect(LightTheme.colors.border).toBe('#e4e4e4')
  })

  it('has the expected text color', () => {
    expect(LightTheme.colors.text).toBe('#000000')
  })
})

describe('DarkTheme', () => {
  it('has dark set to true', () => {
    expect(DarkTheme.dark).toBe(true)
  })

  it('has the expected background color', () => {
    expect(DarkTheme.colors.background).toBe('#000000')
  })

  it('has the expected card color', () => {
    expect(DarkTheme.colors.card).toBe('#181818')
  })

  it('has the expected primary color', () => {
    expect(DarkTheme.colors.primary).toBe('#3f5ec2')
  })

  it('has the expected border color', () => {
    expect(DarkTheme.colors.border).toBe('#242424')
  })

  it('has the expected text color', () => {
    expect(DarkTheme.colors.text).toBe('#ffffff')
  })
})

describe('theme color consistency', () => {
  it('LightTheme and DarkTheme share the same primary color', () => {
    expect(LightTheme.colors.primary).toBe(DarkTheme.colors.primary)
  })

  it('LightTheme and DarkTheme have different backgrounds', () => {
    expect(LightTheme.colors.background).not.toBe(DarkTheme.colors.background)
  })

  it('both themes have all required color properties', () => {
    const requiredProps = [
      'background',
      'border',
      'card',
      'notification',
      'primary',
      'text',
    ] as const

    for (const prop of requiredProps) {
      expect(LightTheme.colors[prop]).toBeDefined()
      expect(DarkTheme.colors[prop]).toBeDefined()
    }
  })
})
