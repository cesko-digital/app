import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../src/theme/default'
import React from 'react'

export const decorators = [
  (Story) => (
    <ThemeProvider theme={defaultTheme}>
      <Story />
    </ThemeProvider>
  ),
]
