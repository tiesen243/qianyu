import { formatDate } from '@qianyu/lib'

describe('formatDate', () => {
  it('formats a valid Date object', () => {
    const date = new Date('2024-01-15')
    const result = formatDate(date)
    expect(result).toMatch(/January/)
    expect(result).toMatch(/15/)
    expect(result).toMatch(/2024/)
  })

  it('formats a valid date string', () => {
    const result = formatDate('2023-07-04')
    expect(result).toMatch(/July/)
    expect(result).toMatch(/4/)
    expect(result).toMatch(/2023/)
  })

  it('returns "Invalid date" for an invalid date string', () => {
    expect(formatDate('not-a-date')).toBe('Invalid date')
  })

  it('returns "Invalid date" for an empty string', () => {
    expect(formatDate('')).toBe('Invalid date')
  })

  it('returns "Invalid date" for an invalid Date object', () => {
    expect(formatDate(new Date('invalid'))).toBe('Invalid date')
  })

  it('formats December 31 correctly', () => {
    const result = formatDate(new Date('2024-12-31'))
    expect(result).toMatch(/December/)
    expect(result).toMatch(/31/)
    expect(result).toMatch(/2024/)
  })

  it('formats a date string with time component', () => {
    const result = formatDate('2024-06-15T10:30:00Z')
    expect(result).toMatch(/June/)
    expect(result).toMatch(/2024/)
  })

  it('returns a string', () => {
    expect(typeof formatDate(new Date())).toBe('string')
  })
})
