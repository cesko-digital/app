import React, { useState } from 'react'
import Section from '../section'
import SectionContent from '../section-content'
import { ButtonAsLink, Link } from 'components/links'
import { ButtonSize } from 'components/buttons'
import { CloseIcon, MenuIcon } from 'components/icons'
import { TranslatedLink } from 'gatsby-plugin-translate-urls'
import { LINKS } from 'utils/constants'

import * as S from './styles'
import { useTranslation } from 'gatsby-plugin-react-i18next'

const Header: React.FC = () => {
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const links = [
    {
      link: '/projects',
      label: t('header.projects'),
    },
    {
      link: '/partners',
      label: t('header.partners'),
    },
    {
      link: 'https://blog.cesko.digital',
      label: 'Blog',
    },
    {
      link: LINKS.supportUs,
      label: t('header.supportUs'),
    },
  ]

  const signUpText = t('header.signUp')

  return (
    <Section as={'header'}>
      <SectionContent verticalPadding={0}>
        <S.Container>
          <TranslatedLink to="/">
            <S.Logo />
          </TranslatedLink>
          <S.DesktopLinksContainer>
            {links.map(({ link, label }) => (
              <Link key={label} to={link} size={ButtonSize.Small}>
                {label}
              </Link>
            ))}

            <S.HeaderButton to={LINKS.joinUs} size={ButtonSize.Normal} inverted>
              {signUpText}
            </S.HeaderButton>
          </S.DesktopLinksContainer>
          <S.MobileLinksContainer>
            <ButtonAsLink to={LINKS.joinUs} size={ButtonSize.Small} inverted>
              {signUpText}
            </ButtonAsLink>
            <S.IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </S.IconButton>
          </S.MobileLinksContainer>
        </S.Container>

        {mobileMenuOpen && (
          <S.MobileMenu>
            {links.map(({ link, label }) => (
              <Link key={label} to={link} size={ButtonSize.Small}>
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
