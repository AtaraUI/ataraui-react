export const colors = {
  primary: {
    50:  '#FFF4EE',
    100: '#FFE0CC',
    200: '#FFBF99',
    300: '#F08050',
    400: '#D4602A',
    500: '#C2440A',
    600: '#A03808',
    700: '#8F2F06',
    800: '#5C1C03',
    900: '#2E0D01',
  },
  neutral: {
    50:  '#f9f7f5',
    100: '#f0ece7',
    200: '#ddd6cc',
    300: '#c5bab0',
    400: '#a89b8e',
    500: '#8a7d72',
    600: '#6f6358',
    700: '#564d45',
    800: '#3c3630',
    900: '#252019',
  },
  danger: {
    500: '#ef4444',
    600: '#dc2626',
  },
  success: {
    500: '#22c55e',
    600: '#16a34a',
  },
  warning: {
    500: '#f59e0b',
    600: '#d97706',
  },
} as const

export const radius = {
  none: '0',
  sm:   '0.25rem',
  md:   '0.375rem',
  lg:   '0.5rem',
  xl:   '0.75rem',
  '2xl':'1rem',
  full: '9999px',
} as const

export const fontSize = {
  xs:   ['0.75rem',  { lineHeight: '1rem' }],
  sm:   ['0.875rem', { lineHeight: '1.25rem' }],
  base: ['1rem',     { lineHeight: '1.5rem' }],
  lg:   ['1.125rem', { lineHeight: '1.75rem' }],
  xl:   ['1.25rem',  { lineHeight: '1.75rem' }],
} as const