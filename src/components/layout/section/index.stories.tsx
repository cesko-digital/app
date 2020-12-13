import React from 'react'
import { Story, Meta } from '@storybook/react'

import { defaultTheme } from 'theme/default'
import Section, { SectionProps } from '.'

const story: Meta = {
  title: 'Layout/Section',
  component: Section,
  argTypes: {
    backgroundColor: {
      table: {
        defaultValue: { summary: '#FFFFFF' },
      },
      control: {
        type: 'color',
      },
    },
  },
}

const Template: Story<SectionProps> = (args: SectionProps) => <Section {...args}>Hello Česko.Digital</Section>

export const Default = Template.bind({})
Default.args = {}

export const CustomColor = Template.bind({})
CustomColor.args = {
  backgroundColor: defaultTheme.colors.lightViolet,
}

export default story
