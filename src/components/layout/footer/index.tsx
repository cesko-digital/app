import React, { useContext } from 'react'
import Section from '../section'
import { ThemeContext } from 'styled-components'
import * as S from './styles'

const Footer: React.FC = () => {
  const theme = useContext(ThemeContext)

  return (
    <Section as={'footer'} backgroundColor={theme.colors.darkGrey}>
      <S.Content verticalPadding={40}>Footer</S.Content>
    </Section>
  )
}

export default Footer
