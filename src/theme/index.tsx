import React, { Fragment } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { GlobalStyle } from './global-style'

interface Props {
  theme: DefaultTheme
}

export const Theme: React.FC<Props> = ({ children, theme }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyle />
      {children}
    </Fragment>
  </ThemeProvider>
)
