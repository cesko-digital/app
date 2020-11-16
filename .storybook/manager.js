import { addons } from '@storybook/addons'
import { create } from '@storybook/theming/create'

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'cesko.digital',
    brandUrl: 'https://cesko.digital/',
    brandImage: 'https://cesko.digital/dist/logo.svg',
  }),
})
