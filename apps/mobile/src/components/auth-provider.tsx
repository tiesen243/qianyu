import * as React from 'react'

interface AuthContextValue {
  user: {
    name: string
    description: string
    avatarUrl: string
    bannerUrl: string
  }
  setUser: React.Dispatch<React.SetStateAction<AuthContextValue['user']>>
}

const ProfileContext = React.createContext<AuthContextValue | null>(null)

const useAuth = () => {
  const context = React.use(ProfileContext)
  if (!context)
    throw new Error('useProfile must be used within a ProfileProvider')
  return context
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthContextValue['user']>({
    name: 'Tiesen',
    description: 'Software Engineer | React Native Developer',
    avatarUrl:
      'https://1.gravatar.com/avatar/48b8ec4ce6c85e06c11bda4381a3ac6cb8161a23e5ea540544c809063090815d?size=256&d=initials',
    bannerUrl:
      'https://1.gravatar.com/userimage/246440012/15125d5975d8649b6e916879900f63aa?size=1024',
  })

  const value = React.useMemo(() => ({ user, setUser }), [user])

  return <ProfileContext value={value}>{children}</ProfileContext>
}

export { AuthProvider, useAuth }
