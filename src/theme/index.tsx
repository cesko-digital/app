import React, { Fragment, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

import { defaultTheme as theme } from './default'
import { GlobalStyle } from './global-style'

interface Props {
  children: ReactNode
}

export const Theme: React.FC<Props> = ({ children }: Props) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyle />
      {children}
    </Fragment>
  </ThemeProvider>
)
