/**
 * Tests for the search screen's filtering logic.
 */
describe('search filtering logic', () => {
  const users = [
    { id: 1, name: 'Alice Smith' },
    { id: 2, name: 'Bob Jones' },
    { id: 3, name: 'Charlie Brown' },
    { id: 4, name: 'Diana Prince' },
    { id: 5, name: 'Ethan Hunt' },
    { id: 6, name: 'Fiona Gallagher' },
    { id: 7, name: 'George Miller' },
    { id: 8, name: 'Hannah Abbott' },
    { id: 9, name: 'Ian Wright' },
    { id: 10, name: 'Julia Roberts' },
  ]

  function filterUsers(searchValue: string) {
    const lowercasedValue = searchValue.toLowerCase()
    return users.filter((user) =>
      user.name.toLowerCase().includes(lowercasedValue)
    )
  }

  it('returns all users when search value is empty', () => {
    expect(filterUsers('')).toHaveLength(10)
  })

  it('filters users by exact name match (case-insensitive)', () => {
    const result = filterUsers('alice')
    expect(result).toHaveLength(1)
    expect(result[0]?.name).toBe('Alice Smith')
  })

  it('filters users by partial name match', () => {
    const result = filterUsers('an')
    const names = result.map((u) => u.name)
    expect(names).toContain('Hannah Abbott')
    expect(names).toContain('Diana Prince')
  })

  it('is case-insensitive', () => {
    const lower = filterUsers('bob')
    const upper = filterUsers('BOB')
    const mixed = filterUsers('Bob')

    expect(lower).toHaveLength(1)
    expect(upper).toHaveLength(1)
    expect(mixed).toHaveLength(1)
    expect(lower[0]?.id).toBe(upper[0]?.id)
    expect(lower[0]?.id).toBe(mixed[0]?.id)
  })

  it('returns empty array when no users match', () => {
    expect(filterUsers('zzz')).toHaveLength(0)
  })

  it('filters by last name', () => {
    const result = filterUsers('roberts')
    expect(result).toHaveLength(1)
    expect(result[0]?.name).toBe('Julia Roberts')
  })

  it('returns multiple results for common substring', () => {
    // 'r' matches: Alice Smith (no), Bob Jones (no), Charlie bRown (yes), Diana PRince (yes),
    //  Ethan Hunt (no), Fiona GallagheR (yes), GeoRge MilleR (yes), Hannah Abbott (no),
    //  Ian WRight (yes), Julia RobeRts (yes)
    const result = filterUsers('r')
    expect(result.length).toBeGreaterThan(1)
  })
})
