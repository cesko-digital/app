import React from 'react'
import { Meta, Story } from '@storybook/react'

import { ButtonSize } from 'components/buttons'
import Link, { LinkProps } from '.'

const { Normal, Small: SmallSize } = ButtonSize
const story: Meta = {
  title: 'Links/Link',
  component: Link,
  argTypes: {
    to: {
      defaultValue: 'https://cesko.digital/',
      control: {
        type: 'text',
      },
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

const Template: Story<LinkProps> = (args: LinkProps) => <Link {...args} />

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
