import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Avatar, Props } from '.'

const story: Meta = {
  title: 'Avatar/Avatar',
  component: Avatar,
}

const Template: Story<Props> = (args: Props) => <Avatar {...args} />

export const WithPicture = Template.bind({})
WithPicture.args = {
  pictureUrl: 'https://picsum.photos/320',
  title: 'Eva Pavlikova',
  subtitle: 'Project Lead',
}

export const WithoutPicture = Template.bind({})
WithoutPicture.args = {
  title: 'Kryštof Nešetřil',
  subtitle: 'Frontend Dev',
}

export default story
