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
import { LINKS } from 'utils/constants'

import * as S from './styles'
import { useTranslation } from 'gatsby-plugin-react-i18next'

const Header: React.FC = () => {
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { locale } = useContext(TranslateUrlsContext)

  const isCzech = locale === 'cs'
  const isEnglish = locale === 'en'

  const MENU = [
    {
      link: '/projects',
      label: t('header.projects'),
      locale: 'cs',
    },
    {
      link: '/partners',
      label: t('header.partners'),
      locale: 'cs',
    },
    {
      link: 'https://blog.cesko.digital',
      label: 'Blog',
      locale: 'cs',
    },
    {
      link: LINKS.supportUs,
      label: t('header.supportUs'),
      locale: 'cs',
    },
  ]

  const EN_PATH = '/en'

  const signUpText = t('header.signUp')

  return (
    <Section as={'header'}>
      <SectionContent verticalPadding={0}>
        <S.Container>
          <TranslatedLink to="/">
            <S.Logo />
          </TranslatedLink>
          <S.DesktopLinksContainer>
            {isCzech &&
              MENU.map(({ link, label, locale }) => (
                <Link
                  key={label}
                  to={link}
                  size={ButtonSize.Small}
                  locale={locale}
                >
                  {label}
                </Link>
              ))}

            {isCzech && (
              <S.HeaderButton
                to={LINKS.joinUs}
                size={ButtonSize.Normal}
                inverted
              >
                {signUpText}
              </S.HeaderButton>
            )}

            {isCzech && (
              <Link
                key={t('header.english') as string}
                to={EN_PATH}
                size={ButtonSize.Small}
                locale="en"
              >
                {t('header.english')}
              </Link>
            )}
            {isEnglish && (
              <Link
                key={t('header.czech') as string}
                to="/"
                size={ButtonSize.Small}
                locale="cs"
              >
                {t('header.czech')}
              </Link>
            )}
          </S.DesktopLinksContainer>
          <S.MobileLinksContainer>
            {isCzech && (
              <Link
                key={t('header.english') as string}
                to={EN_PATH}
                size={ButtonSize.Small}
                locale="en"
              >
                {t('header.english')}
              </Link>
            )}
            {isCzech && (
              <ButtonAsLink to={LINKS.joinUs} size={ButtonSize.Small} inverted>
                {signUpText}
              </ButtonAsLink>
            )}
            {isCzech && (
              <S.IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </S.IconButton>
            )}
            {isEnglish && (
              <Link
                key={t('header.czech') as string}
                to="/"
                size={ButtonSize.Small}
                locale="cs"
              >
                {t('header.czech')}
              </Link>
            )}
          </S.MobileLinksContainer>
        </S.Container>

        {mobileMenuOpen && (
          <S.MobileMenu>
            {MENU.map(({ link, label, locale }) => (
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
