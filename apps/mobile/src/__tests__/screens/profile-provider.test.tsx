import { ProfileProvider, useProfile } from '@/screens/(tabs)/profile/screen.provider'
import { renderHook, act } from '@testing-library/react-native'
import * as React from 'react'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ProfileProvider>{children}</ProfileProvider>
)

describe('useProfile', () => {
  it('throws when used outside of ProfileProvider', () => {
    expect(() => renderHook(() => useProfile())).toThrow(
      'useProfile must be used within a ProfileProvider'
    )
  })

  it('returns the default profile data', () => {
    const { result } = renderHook(() => useProfile(), { wrapper })

    expect(result.current.profile.name).toBe('Tiesen')
    expect(result.current.profile.description).toBe(
      'Software Engineer | React Native Developer'
    )
    expect(result.current.profile.avatarUrl).toBeTruthy()
    expect(result.current.profile.bannerUrl).toBeTruthy()
  })

  it('updates the profile when setProfile is called', () => {
    const { result } = renderHook(() => useProfile(), { wrapper })

    act(() => {
      result.current.setProfile((prev) => ({
        ...prev,
        name: 'Updated Name',
        description: 'New description',
      }))
    })

    expect(result.current.profile.name).toBe('Updated Name')
    expect(result.current.profile.description).toBe('New description')
  })

  it('preserves other profile fields when updating partially', () => {
    const { result } = renderHook(() => useProfile(), { wrapper })
    const originalAvatarUrl = result.current.profile.avatarUrl

    act(() => {
      result.current.setProfile((prev) => ({ ...prev, name: 'New Name' }))
    })

    expect(result.current.profile.avatarUrl).toBe(originalAvatarUrl)
  })
})

describe('ProfileProvider', () => {
  it('renders children without throwing', () => {
    const { result } = renderHook(() => useProfile(), { wrapper })
    expect(result.current).toBeDefined()
  })

  it('provides a setProfile function', () => {
    const { result } = renderHook(() => useProfile(), { wrapper })
    expect(typeof result.current.setProfile).toBe('function')
  })
})
