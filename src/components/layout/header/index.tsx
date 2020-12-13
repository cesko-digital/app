import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import Section from '../section'
import SectionContent from '../section-content'

const Header: React.FC = () => {
  const theme = useContext(ThemeContext)

  return (
    <Section as={'header'} backgroundColor={theme.colors.pebble}>
      <SectionContent verticalPadding={40}>Header</SectionContent>
    </Section>
  )
}

export default Header
