import React, { Fragment } from 'react'
import { ThemeProvider } from 'styled-components'

import { defaultTheme as theme } from './default'
import { GlobalStyle } from './global-style'

export const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyle />
      {children}
    </Fragment>
  </ThemeProvider>
)
