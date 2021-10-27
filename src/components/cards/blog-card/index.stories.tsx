import React, { ComponentProps } from 'react'
import { Story, Meta } from '@storybook/react'

import BlogCard from '.'
import { CardRow } from 'components/layout'

const story: Meta = {
  title: 'Cards/Blog',
  component: BlogCard,
}

export const Default: Story<ComponentProps<typeof BlogCard>> = (args) => (
  <CardRow>
    {Array.from({ length: 3 }).map((_, i) => (
      <BlogCard key={i} {...args} />
    ))}
  </CardRow>
)

Default.args = {
  title:
    'Partnerství Česko.Digital a Bakala Foundation – sdílíme hodnoty i vizi, digitalizace je pro nás nástroj ke změně myšlení',
  description:
    'Česko.Digital a Bakala Foundation uzavřeli partnerství, díky kterému Česko.Digital získá od nadace podporu ve výši 4 miliony korun. Tyto peníze budou věnovány na rozvoj celé organizace Česko.Digital a na dva konkrétní projekty: Učíme online a Střecha duševního zdraví.',
  cover: 'https://via.placeholder.com/400x200',
  link: '#',
}

export default story
