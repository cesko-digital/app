import React from 'react'
import { Meta, Story } from '@storybook/react'

import { ButtonSize } from '..'
import LinkAsButton, { LinkAsButtonProps } from '.'

const { Normal, Small: SmallSize } = ButtonSize
const story: Meta = {
  title: 'Buttons/LinkAsButton',
  component: LinkAsButton,
  argTypes: {
    onClick: {
      action: 'click',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    size: {
      defaultValue: Normal,
      control: {
        type: 'select',
        options: [Normal, SmallSize],
      },
    },
  },
}

const Template: Story<LinkAsButtonProps> = (args: LinkAsButtonProps) => <LinkAsButton {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Link',
}

export const Small = Template.bind({})
Small.args = {
  children: 'Link',
  size: SmallSize,
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'Link',
  disabled: true,
}

export default story
