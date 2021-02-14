import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: {
      none: number
      base: number
      small: number
    }
    borderWidth: {
      none: number
      normal: number
    }
    breakpoints: {
      sm: string
      md: string
      lg: string
    }
    animation: {
      duration: {
        base: string
      }
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
      mediumGray: string
      darkGrey: string
      asphalt: string
      stone: string
      gravel: string
      pebble: string
      white: string

      it: string
      darkIt: string
      martinique: string
      purple: string
      violet: string
      lightViolet: string

      yellow: string
      orange: string
      darkRed: string
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
      text: number
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
    controlHeights: {
      normal: number
    }
  }

  export type CssWithTheme = FlattenInterpolation<ThemeProps<DefaultTheme>>
}
