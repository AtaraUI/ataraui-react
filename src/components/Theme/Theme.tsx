import React from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type Theme = 'light' | 'dark' | 'system'

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

export const useTheme = (): ThemeContextValue => {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'ataraui-theme'

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getStoredTheme = (): Theme | null => {
  if (typeof window === 'undefined') return null
  return (localStorage.getItem(STORAGE_KEY) as Theme) ?? null
}

const applyTheme = (resolved: 'light' | 'dark') => {
  document.documentElement.setAttribute('data-theme', resolved)
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
}) => {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    return getStoredTheme() ?? defaultTheme
  })

  const resolvedTheme: 'light' | 'dark' = React.useMemo(() => {
    return theme === 'system' ? getSystemTheme() : theme
  }, [theme])

  // Apply on mount and when resolvedTheme changes
  React.useEffect(() => {
    applyTheme(resolvedTheme)
  }, [resolvedTheme])

  // Listen to system preference changes when theme is 'system'
  React.useEffect(() => {
    if (theme !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme(media.matches ? 'dark' : 'light')

    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [theme])

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }, [resolvedTheme, setTheme])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeProvider.displayName = 'ThemeProvider'