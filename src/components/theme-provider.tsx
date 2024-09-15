import {
  createContext,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from 'react'
import { useStorageState } from '@/lib/hooks/use-storage-state'
import type { Theme } from '@/types'

type ThemeProviderState = {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
}

export const ThemeContext = createContext<ThemeProviderState>(
  {} as ThemeProviderState
)

export function ThemeProvider(props: { children: ReactNode }) {
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

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

function getSystemTheme() {
  const query = '(prefers-color-scheme: dark)'
  return window.matchMedia(query).matches ? 'dark' : 'light'
}
