import type { Theme } from '@react-navigation/native'

import { DefaultTheme } from '@react-navigation/native'

export const LightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    background: '#fafafa',
    text: '#000000',
    card: '#ffffff',
    notification: '#ffffff',
    primary: '#3f5ec2',
    border: '#e4e4e4',
  },
} satisfies Theme

export const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    background: '#000000',
    text: '#ffffff',
    card: '#181818',
    notification: '#181818',
    primary: '#3f5ec2',
    border: '#242424',
  },
} satisfies Theme
