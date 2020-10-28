import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: {
      none: number
      base: number
    }
    breakpoints: {
      sm: string
      md: string
      lg: string
    }
    fontSizes: {
      xxxl: number
      xxl: number
      xl: number
      l: number
      lg: number
      md: number
      base: number
      small: number
    }
    colors: {
      lightGray: string
      darkGrey: string
      asphalt: string
      gravel: string
      pebble: string
      white: string

      it: string
      darkIt: string
      purple: string
      violet: string
      lightViolet: string

      yellow: string
    }
    contentSize: number
    space: {
      xxxl: number
      xxl: number
      xl: number
      lg: number
      md: number
      base: number
      small: number
      none: number
    }
    fonts: {
      body: string
      heading: string
      monospace: string
    }
    fontWeights: {
      body: number
      heading: number
      bold: number
      button: number
    }
    lineHeights: {
      body: number
      heading: number
      button: number
    }
    shadows: {
      small: string
      large: string
    }
    variants: unknown
    text: unknown
    buttons: {
      primary: {
        color: string
        bg: string
      }
    }
  }

  export type CssWithTheme = FlattenInterpolation<ThemeProps<DefaultTheme>>
}
