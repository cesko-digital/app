import React from 'react'
import { configure } from '@storybook/react'
import { addDecorator } from '@storybook/react'

// Import theme to wrap it around stories
import { Theme } from '../src/theme'

function withTheme(storyFn) {
  return (
    <>
      <Theme>
        {storyFn()}
      </Theme>
    </>
  )
}

// Apply decorator for 
addDecorator(withTheme)

// Import all files in stories folder ending in *.stories.ts(x)
configure(require.context('../stories', true, /\.stories\.tsx?$/), module)

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}

// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ''

// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action('NavigateTo:')(pathname)
}
