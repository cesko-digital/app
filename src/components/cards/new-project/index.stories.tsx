import React from 'react'
import { Story, Meta } from '@storybook/react'
import NewProject from '.'

const story: Meta = {
  title: 'Cards/NewProject',
  component: NewProject,
  argTypes: {
    name: {
      defaultValue: 'Mám nápad na projekt',
      control: {
        type: 'text',
      },
    },
    description: {
      defaultValue:
        'Rozvíjíme nápady, které skrze IT pomáhají zlepšovat život v Česku, nemají komerční alternativu a jsou udržitelné. Máte takový projekt, nebo na něm pracujete, ale chybí vám expertní dobrovolníci?',
      control: {
        type: 'text',
      },
    },
    linkUrl: {
      defaultValue: 'https://cesko-digital.slack.com/archives/CHG9NA23D',
      control: {
        type: 'text',
      },
    },
    linkText: {
      defaultValue: 'Zadat projekt',
      control: {
        type: 'text',
      },
    },
  },
}

const Template: Story = (args) => <NewProject {...args} />

export const Default = Template.bind({})

export default story
