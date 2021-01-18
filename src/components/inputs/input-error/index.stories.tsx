import React from 'react'
import { Story, Meta } from '@storybook/react'

import InputError, { InputErrorProps } from '.'

const story: Meta = {
  title: 'Inputs/InputError',
  component: InputError,
}

const Template: Story<InputErrorProps> = (args: InputErrorProps) => (
  <InputError {...args}>This is a sample input error message.</InputError>
)

export const Default = Template.bind({})
Default.args = {
  dark: false,
}

export const Dark = Template.bind({})
Dark.args = {
  dark: true,
}

export default story
