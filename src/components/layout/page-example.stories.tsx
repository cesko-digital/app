import React, { useContext } from 'react'
import { Story, Meta } from '@storybook/react'
import { LayoutProps, Layout, SectionContent, Section } from 'components/layout'
import { ThemeContext } from 'styled-components'

const story: Meta = {
  title: 'Layout/Page Example',
  component: Layout,
}

const Template: Story<LayoutProps> = (args: LayoutProps) => {
  const theme = useContext(ThemeContext)
  return (
    <Layout {...args}>
      <Section>
        <SectionContent>Hello</SectionContent>
      </Section>
      <Section backgroundColor={theme.colors.lightViolet}>
        <SectionContent>...</SectionContent>
        ...
        <SectionContent>...</SectionContent>
      </Section>
      <Section>
        <SectionContent>Česko.Digital</SectionContent>
      </Section>
    </Layout>
  )
}

export const Default = Template.bind({})
Default.args = {
  crumbs: [{ label: 'Projects', path: '/path' }, { label: 'CityVizor' }],
  seo: {
    description: 'Transparentní hospodaření státu',
    title: 'CityVizor',
    coverUrl: 'https://via.placeholder.com/400x200',
  },
}

export default story
