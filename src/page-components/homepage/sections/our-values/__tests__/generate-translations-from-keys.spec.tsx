import { ThemeProvider } from 'styled-components'
import React from 'react'
import { defaultTheme } from 'theme/default'
import OurValues from '..'
import Value from '../value'
import { mount } from 'enzyme'

jest.mock('gatsby-plugin-react-i18next', () => {
  return {
    useTranslation: () => ({
      t: jest.fn((p) => p),
    }),
  }
})

describe('generate-translations-from-keys', () => {
  const tranlationKeys = [
    'pages.homepage.sections.ourValues.main.title',
    'pages.homepage.sections.ourValues.main.perex',
    'pages.homepage.sections.ourValues.openness.title',
    'pages.homepage.sections.ourValues.openness.perex',
    'pages.homepage.sections.ourValues.professionalism.title',
    'pages.homepage.sections.ourValues.professionalism.perex',
    'pages.homepage.sections.ourValues.efficiency.title',
    'pages.homepage.sections.ourValues.efficiency.perex',
    'pages.homepage.sections.ourValues.participatory.title',
    'pages.homepage.sections.ourValues.participatory.perex',
    'pages.homepage.sections.ourValues.users.title',
    'pages.homepage.sections.ourValues.users.perex',
    'pages.homepage.sections.ourValues.technologies.title',
    'pages.homepage.sections.ourValues.technologies.perex',
  ]
  const getComponent = () => {
    const component = mount(
      <ThemeProvider theme={defaultTheme}>
        <OurValues />
      </ThemeProvider>
    )
    return component
  }

  it('renders 6 elements', () => {
    const component = getComponent()
    expect(component.find(Value).length).toBe(6)
  })

  it('renders content with proper translation keys', () => {
    const component = getComponent()
    const componentText = component.text()
    tranlationKeys.forEach((tranlationKey) =>
      expect(componentText.includes(tranlationKey)).toBeTruthy()
    )
  })
})
