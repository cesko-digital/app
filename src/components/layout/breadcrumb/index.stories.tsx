import React from 'react'
import { Story, Meta } from '@storybook/react'
import Breadcrumb, { BreadcrumbProps } from '.'

const story: Meta = {
  title: 'Layout/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    crumbs: {
      defaultValue: [{ label: 'Projekty' }],
      control: {
        type: 'object',
      },
    },
    homeLabel: {
      defaultValue: 'Homepage',
      control: {
        type: 'text',
      },
    },
    homeLink: {
      defaultValue: 'https://cesko.digital/',
      control: {
        type: 'text',
      },
    },
  },
}

const Template: Story<BreadcrumbProps> = (args: BreadcrumbProps) => (
  <Breadcrumb {...args} />
)

export const Default = Template.bind({})
Default.args = {
  crumbs: [{ label: 'Projekty' }],
}

export const Nested = Template.bind({})
Nested.args = {
  crumbs: [
    { label: 'Projekty', path: 'https://cesko.digital/' },
    { label: 'Dáme roušky' },
  ],
}

export const Empty = Template.bind({})
Empty.args = {
  crumbs: [],
}

export default story
