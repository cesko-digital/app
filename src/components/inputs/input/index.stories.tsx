import React from 'react'
import { Story, Meta } from '@storybook/react'

import Input, { InputProps } from '.'
import { InputLabel } from '..'

const story: Meta = {
  title: 'Inputs/Input',
  component: Input,
}

const Template: Story<InputProps> = (args: InputProps) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {
  dark: false,
  invalid: false,
  placeholder: 'Placeholder',
}

export const LightInvalid = Template.bind({})
LightInvalid.args = {
  ...Default.args,
  invalid: true,
}

export const Dark = Template.bind({})
Dark.args = {
  ...Default.args,
  dark: true,
}

export const DarkInvalid = Template.bind({})
DarkInvalid.args = {
  ...Default.args,
  dark: true,
  invalid: true,
}

export const WithLabel: Story<InputProps> = (args: InputProps) => (
  <>
    <InputLabel>Label</InputLabel>
    <Input {...args} />
  </>
)
WithLabel.args = Default.args

export default story
