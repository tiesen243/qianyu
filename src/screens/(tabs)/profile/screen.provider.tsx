import * as React from 'react'

interface ProfileContextValue {
  profile: {
    name: string
    description: string
    avatarUrl: string
    bannerUrl: string
  }
  setProfile: React.Dispatch<
    React.SetStateAction<ProfileContextValue['profile']>
  >
}

const ProfileContext = React.createContext<ProfileContextValue | null>(null)

const useProfile = () => {
  const context = React.use(ProfileContext)
  if (!context)
    throw new Error('useProfile must be used within a ProfileProvider')
  return context
}

function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = React.useState<ProfileContextValue['profile']>({
    name: 'Tiesen',
    description: 'Software Engineer | React Native Developer',
    avatarUrl:
      'https://1.gravatar.com/avatar/48b8ec4ce6c85e06c11bda4381a3ac6cb8161a23e5ea540544c809063090815d?size=256&d=initials',
    bannerUrl:
      'https://1.gravatar.com/userimage/246440012/15125d5975d8649b6e916879900f63aa?size=1024',
  })

  const value = React.useMemo(() => ({ profile, setProfile }), [profile])

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}

export { ProfileProvider, useProfile }
