import React, { useContext } from 'react'
import Section from '../section'
import { ThemeContext } from 'styled-components'
import SectionContent from '../section-content'
import { ButtonAsLink, Link } from 'components/links'
import { ButtonSize } from 'components/buttons'

import * as S from './styles'

const Header: React.FC = () => {
  const theme = useContext(ThemeContext)

  const t = {
    links: {
      projects: 'Projekty',
      blog: 'Blog',
      signUp: 'Chci se zapojit',
    },
  }

  return (
    <Section as={'header'} backgroundColor={theme.colors.pebble}>
      <SectionContent verticalPadding={40}>
        <S.Container>
          <S.Logo />
          <S.LinksContainer>
            <Link to="#" size={ButtonSize.Small}>
              {t.links.projects}
            </Link>
            <Link to="#" size={ButtonSize.Small}>
              {t.links.blog}
            </Link>
            <ButtonAsLink to="#" size={ButtonSize.Normal} inverted>
              {t.links.signUp}
            </ButtonAsLink>
          </S.LinksContainer>
        </S.Container>
      </SectionContent>
    </Section>
  )
}

export default Header
