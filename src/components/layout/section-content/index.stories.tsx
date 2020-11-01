import React from 'react'
import { Story, Meta } from '@storybook/react'

import SectionContent, { SectionContentProps } from '.'

const story: Meta = {
  title: 'Layout/SectionContent',
  component: SectionContent,
  argTypes: {
    horizontalPadding: {
      description: 'Left and right padding',
      table: {
        defaultValue: { summary: 20 },
      },
      control: {
        type: 'number',
      },
    },
    verticalPadding: {
      description: 'Top and bottom padding',
      table: {
        defaultValue: { summary: 20 },
      },
      control: {
        type: 'number',
      },
    },
  },
}

const Template: Story<SectionContentProps> = (args) => (
  <SectionContent {...args}>Content container</SectionContent>
)

export const Default = Template.bind({})
Default.args = {}

export const WithPadding = Template.bind({})
WithPadding.args = {
  horizontalPadding: 80,
  verticalPadding: 80,
}

export default story
