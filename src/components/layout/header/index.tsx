import React, { useState } from 'react'
import Section from '../section'
import SectionContent from '../section-content'
import { ButtonAsLink, Link } from 'components/links'
import { ButtonSize } from 'components/buttons'
import Close from 'components/icons/close'
import Menu from 'components/icons/menu'
import GatsbyLink from 'gatsby-link'

import * as S from './styles'

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const t = {
    links: {
      projects: 'Projekty',
      blog: 'Blog',
      contribute: 'Přispět',
      english: 'English',
      signUp: 'Chci se zapojit',
      close: 'Zavřít',
      menu: 'Menu',
    },
  }

  const links = [
    {
      link: '#',
      label: t.links.projects,
    },
    {
      link: '#',
      label: t.links.blog,
    },
    {
      link: '#',
      label: t.links.contribute,
    },
    {
      link: '/',
      locale: 'en',
      label: t.links.english,
    },
  ]

  return (
    <Section as={'header'}>
      <SectionContent verticalPadding={0}>
        <S.Container>
          <GatsbyLink to="/">
            <S.Logo />
          </GatsbyLink>
          <S.DesktopLinksContainer>
            {links.map(({ link, label, locale }) => (
              <Link
                key={label}
                to={link}
                size={ButtonSize.Small}
                locale={locale}
              >
                {label}
              </Link>
            ))}

            <ButtonAsLink to="#" size={ButtonSize.Normal} inverted>
              {t.links.signUp}
            </ButtonAsLink>
          </S.DesktopLinksContainer>
          <S.MobileLinksContainer>
            <ButtonAsLink to="#" size={ButtonSize.Small} inverted>
              {t.links.signUp}
            </ButtonAsLink>
            <S.IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <Close /> : <Menu />}
            </S.IconButton>
          </S.MobileLinksContainer>
        </S.Container>

        {mobileMenuOpen && (
          <S.MobileMenu>
            {links.map(({ link, label, locale }) => (
              <Link
                key={label}
                to={link}
                size={ButtonSize.Small}
                locale={locale}
              >
                {label}
              </Link>
            ))}
          </S.MobileMenu>
        )}
      </SectionContent>
    </Section>
  )
}

export default Header
