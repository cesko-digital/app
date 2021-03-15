import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react'

import SlackButton, { SlackButtonProps } from '.'

const story: Meta = {
  title: 'Buttons/SlackButton',
  component: SlackButton,
}

const Template: Story<SlackButtonProps> = (args: SlackButtonProps) => (
  <SlackButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
  slackLink: 'https://cesko.digital',
  slackText: 'Join Us',
}

export default story
