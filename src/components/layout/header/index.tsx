import React, { useContext, useState } from 'react'
import Section from '../section'
import SectionContent from '../section-content'
import { ButtonAsLink, Link } from 'components/links'
import { ButtonSize } from 'components/buttons'
import { CloseIcon, MenuIcon } from 'components/icons'
import {
  TranslatedLink,
  TranslateUrlsContext,
} from 'gatsby-plugin-translate-urls'

import * as S from './styles'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { getLinks } from './helpers'

const Header: React.FC = () => {
  const { locale } = useContext(TranslateUrlsContext)
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const links = getLinks({
    locale,
    translations: {
      projects: t('header.projects'),
      czech: t('header.czech'),
      english: t('header.english'),
      blog: 'Blog',
      contribute: t('header.contribute'),
    },
  })

  const signUpText = t('header.signUp')

  return (
    <Section as={'header'}>
      <SectionContent verticalPadding={0}>
        <S.Container>
          <TranslatedLink to="/">
            <S.Logo />
          </TranslatedLink>
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
              {signUpText}
            </ButtonAsLink>
          </S.DesktopLinksContainer>
          <S.MobileLinksContainer>
            <ButtonAsLink to="#" size={ButtonSize.Small} inverted>
              {signUpText}
            </ButtonAsLink>
            <S.IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
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
