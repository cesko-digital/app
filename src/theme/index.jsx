import React, { Fragment } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Button } from 'rebass'

import { defaultTheme as theme } from './default'
import { GlobalStyle } from './GlobalStyle'

export const LayoutComponents = {
  h1: styled.h1`
    font-size: 20px;
  `,
  p: styled.p`
    font-size: 16px;
  `,
}

export const UIComponents = {
  Button: (props) => <Button {...props}>{props.children}</Button>,
}

export const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <GlobalStyle />
      {children}
    </Fragment>
  </ThemeProvider>
)
