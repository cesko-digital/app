import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react'

import { NewProject, NewProjectProps } from './'

const story: Meta = {
  title: 'Example/NewProject',
  component: NewProject,
}

const Template: Story<NewProjectProps> = () => (
  <NewProject
    name="Mám nápad na projekt"
    description="Rozvíjíme nápady, které skrze IT pomáhají zlepšovat život v Česku, nemají komerční alternativu a jsou udržitelné. Máte takový projekt, nebo na něm pracujete, ale chybí vám expertní dobrovolníci?"
    icon="icon"
  />
)

export const NewProjectExample = Template.bind({})

export default story
