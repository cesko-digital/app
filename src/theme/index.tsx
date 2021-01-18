import React, { Fragment, ReactNode } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'

import { defaultTheme } from './default'
import { GlobalStyle } from './global-style'

import './fonts.css' // Adding fonts in createGlobalStyle is introducing font flickering

interface Props {
  theme?: DefaultTheme
  children: ReactNode
}

export const Theme: React.FC<Props> = ({
  children,
  theme = defaultTheme,
}: Props) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyle />
      {children}
    </Fragment>
  </ThemeProvider>
)
