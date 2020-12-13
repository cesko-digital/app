import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react'

import { ButtonSize } from './enums'
import Button, { ButtonProps } from '.'

const story: Meta = {
  title: 'Buttons/Button',
  component: Button,
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    size: {
      defaultValue: ButtonSize.Normal,
      control: {
        type: 'select',
        options: [ButtonSize.Normal, ButtonSize.Small],
      },
    },
    inverted: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    onClick: {
      action: 'click',
    },
  },
}

const Template: Story<ButtonProps> = (args: ButtonProps) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Button',
}

export const Inverted = Template.bind({})
Inverted.args = {
  children: 'Button',
  inverted: true,
}

export const Small = Template.bind({})
Small.args = {
  children: 'Button',
  size: ButtonSize.Small,
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'Button',
  disabled: true,
}

export default story
