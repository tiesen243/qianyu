import * as React from 'react'

interface Lab7ContextValue {
  username: string
  setUsername: React.Dispatch<React.SetStateAction<string>>
}

const Lab7Context = React.createContext<Lab7ContextValue | null>(null)

const useLab7 = () => {
  const context = React.use(Lab7Context)
  if (!context) throw new Error('useLab7 must be used within a Lab7Provider')
  return context
}

function Lab7Provider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = React.useState('')

  const value = React.useMemo(() => ({ username, setUsername }), [username])

  return <Lab7Context value={value}>{children}</Lab7Context>
}

export { Lab7Provider, useLab7 }
