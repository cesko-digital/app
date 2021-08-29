import React from 'react'
import { Story, Meta } from '@storybook/react'
import Tabs, { TabsProps } from '.'

const story: Meta = {
  title: 'Layout/Tabs',
  component: Tabs,
  argTypes: {
    items: {
      defaultValue: [{ label: 'Projekty' }],
      control: {
        type: 'object',
      },
    },
  },
}

const Template: Story<TabsProps> = (args: TabsProps) => <Tabs {...args} />

export const Default = Template.bind({})
Default.args = {
  items: [
    { label: 'Projects', key: 'projects' },
    { label: 'Next projects', key: 'next-projects' },
    { label: 'Even more projects', key: 'more-projects' },
    { label: 'Cooperation', key: 'coop' },
  ],
}

export default story
