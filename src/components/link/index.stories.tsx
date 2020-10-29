import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react'

import Link, { LinkProps } from '.'
import { ButtonSize } from '../button'

const story: Meta = {
  title: 'Link',
  component: Link,
  argTypes: {
    href: {
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
      defaultValue: ButtonSize.Normal,
      control: {
        type: 'select',
        options: [ButtonSize.Normal, ButtonSize.Small],
      },
    },
    onClick: { action: 'click' },
    onFocus: { action: 'focus' },
    onBlur: { action: 'blur' },
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
  size: ButtonSize.Small,
}

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'Link',
  disabled: true,
}

export default story
