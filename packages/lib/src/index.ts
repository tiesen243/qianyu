function isValidDate(date: unknown): date is Date {
  if (typeof date === 'string') {
    const parsedDate = new Date(date)
    return !isNaN(parsedDate.getTime())
  }

  return date instanceof Date && !isNaN(date.getTime())
}

export function formatDate(date: Date | string): string {
  if (!isValidDate(date)) return 'Invalid date'

  return Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}
