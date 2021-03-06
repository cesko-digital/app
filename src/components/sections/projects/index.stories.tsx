import React from 'react'
import { Story, Meta } from '@storybook/react'

import Projects, { ProjectsProps } from '.'
import { Tag } from 'generated/graphql-types'

const story: Meta = {
  title: 'Sections/Projects',
  component: Projects,
  argTypes: {
    otherProjects: {
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
  },
}

const Template: Story<ProjectsProps> = (args: ProjectsProps) => (
  <Projects {...args} />
)

const sampleProject = {
  name: 'Učíme online',
  tagline: 'Prostě učíme online',
  logoUrl: 'https://via.placeholder.com/100',
  coverUrl: 'https://via.placeholder.com/400x200',
  slug: 'ucime-online',
  tags: [{ slug: 'tag', name: 'Tag' } as Tag],
}

export const Default = Template.bind({})
Default.args = {
  projects: [sampleProject, sampleProject, sampleProject],
}

export const OtherProjects = Template.bind({})
OtherProjects.args = {
  projects: [sampleProject, sampleProject, sampleProject],
  otherProjects: true,
}

export default story
