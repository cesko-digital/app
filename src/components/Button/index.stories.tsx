import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react'

import { Button, ButtonSize, ButtonProps } from './index'

const story: Meta = {
  title: 'Button',
  component: Button,
}

const Template: Story<ButtonProps> = (args: ButtonProps) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Co děláme',
}

export default story
