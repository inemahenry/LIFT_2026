export const colors = {
  primary: '#006EB6',
  secondary: '#F9BFCB',
  ivory: '#FFFFF0',

  white: '#FFFFFF',
  black: '#111111',

  text: '#17212B',
  textSecondary: '#667085',
  muted: '#98A2B3',

  background: '#FFFFF0',
  surface: '#FFFFFF',

  border: '#E4E7EC',

  success: '#12B76A',
  warning: '#F79009',
  error: '#F04438',

  dark: '#0F1720',
} as const

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
} as const

export const typography = {
  fontFamily: 'BricolageGrotesque',
  fontFamilySemiBold: 'BricolageGrotesque_600SemiBold',
  fontFamilyBold: 'BricolageGrotesque_700Bold',
} as const