import React, { ComponentProps } from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react'

import ProjectCard from '.'
import { CardRow } from 'components/layout'

const story: Meta = {
  title: 'Cards/ProjectCard',
  component: ProjectCard,
}

export const Default: Story<ComponentProps<typeof ProjectCard>> = (args) => (
  <CardRow>
    {Array.from({ length: 3 }).map((_, i) => (
      <ProjectCard key={i} {...args} />
    ))}
  </CardRow>
)

Default.args = {
  title: 'Project name',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  cover: 'https://via.placeholder.com/400x200',
  logo: 'https://via.placeholder.com/100',
  link: '#',
  tags: ['javascript'],
}

export default story
