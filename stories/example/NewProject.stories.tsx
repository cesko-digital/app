import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react'

import { NewProject, NewProjectProps } from '../../src/components/new-project'

const story: Meta = {
  title: 'Example/NewProject',
  component: NewProject,
}

const Template: Story<NewProjectProps> = () => (
  <NewProject name="test" description="test" icon="test" linkToSlack="test" />
)

export const NewProjectExample = Template.bind({})

export default story
