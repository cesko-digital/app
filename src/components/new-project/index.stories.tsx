import React from 'react'
import { Story, Meta } from '@storybook/react'
import { NewProject, NewProjectProps } from './'
import icon from '../../images/bulb.png'

const story: Meta = {
  title: 'NewProject/Default',
  component: NewProject,
}

const Template: Story<NewProjectProps> = () => (
  <NewProject
    name="Mám nápad na projekt"
    description="Rozvíjíme nápady, které skrze IT pomáhají zlepšovat život v Česku, nemají komerční alternativu a jsou udržitelné. Máte takový projekt, nebo na něm pracujete, ale chybí vám expertní dobrovolníci?"
    icon={icon}
    linkUrl="https://cesko-digital.slack.com/archives/CHG9NA23D"
    linkText="Zadat projekt"
  />
)

export const NewProjectExample = Template.bind({})

export default story
