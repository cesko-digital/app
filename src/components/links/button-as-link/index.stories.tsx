import React from 'react'
import { Story, Meta } from '@storybook/react'

import ButtonAsLink, { ButtonAsLinkProps } from '.'
import { ButtonSize } from 'components/buttons'

const story: Meta = {
  title: 'Links/ButtonAsLink',
  component: ButtonAsLink,
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
    to: {
      defaultValue: 'https://cesko.digital/',
      control: {
        type: 'text',
      },
    },
  },
}

const Template: Story<ButtonAsLinkProps> = (args: ButtonAsLinkProps) => (
  <ButtonAsLink {...args} />
)

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
