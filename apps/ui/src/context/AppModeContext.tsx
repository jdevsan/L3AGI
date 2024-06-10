import { createContext, useContext, useState } from 'react'

import type { ReactNode } from 'react'

type AppModeContextType = {
  mode: string
  setMode: (mode: string) => void
}

const MODES = ['Compute', 'Subnet API']

export const AppModeContext = createContext<AppModeContextType | null>(null)

type AppModeContextProviderProps = {
  children: ReactNode
}

export function AppModeContextProvider({ children }: AppModeContextProviderProps): JSX.Element {
  const [mode, setMode] = useState<string>(localStorage.getItem('appMode') || MODES[0])

  const saveModeToLocal = (newMode: string) => {
    localStorage.setItem('appMode', newMode)
    setMode(newMode)
  }

  const value: AppModeContextType = {
    mode,
    setMode: saveModeToLocal,
  }

  return <AppModeContext.Provider value={value}>{children}</AppModeContext.Provider>
}

export function useAppModeContext(): AppModeContextType {
  const context = useContext(AppModeContext)

  if (!context) throw new Error('useAppModeContext must be used within an AppModeContextProvider')

  return context
}
