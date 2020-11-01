import * as React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react'

import PaneVolunteer, { Props } from '.'

const story: Meta = {
  title: 'Cards/PaneVolunteer',
  component: PaneVolunteer,
}

const Template: Story<Props> = (args: Props) => <PaneVolunteer {...args} />

export const Primary = Template.bind({})
Primary.args = {
  title: 'Jsem Dobrovolník',
  description:
    'Vývojář? Projekťák? Marketér? Projekty fungují nejlépe právě díky rozmanitosti týmů a sdílení zkušeností. Pokud máte chuť a čas, ať už hodinu nebo deset týdně, přidejte se.',
  cover: 'https://via.placeholder.com/768x287',
  slackLink: '#abc',
}

export default story
