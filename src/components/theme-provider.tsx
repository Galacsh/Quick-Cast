import { useEffect, createContext } from 'react'
import { useStorageState } from '@/lib/hooks/use-storage-state'
import type { Theme, ThemeProviderState, ThemeProviderProps } from '@/types'

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => 'system',
}

function getSystemTheme() {
  const query = '(prefers-color-scheme: dark)'
  return window.matchMedia(query).matches ? 'dark' : 'light'
}

export const ThemeContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [theme, setTheme] = useStorageState<Theme>('theme', 'system')

  useEffect(() => {
    if (theme == null) return

    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      root.classList.add(getSystemTheme())
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  const value = { theme, setTheme }

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
