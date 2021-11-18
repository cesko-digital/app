import React, { useContext, useState } from 'react'
import Section from '../section'
import SectionContent from '../section-content'
import { ButtonAsLink, Link } from 'components/links'
import { ButtonSize } from 'components/buttons'
import { CloseIcon, MenuIcon } from 'components/icons'
import { Link as TranslatedLink } from 'gatsby-plugin-react-i18next'
import { LINKS } from 'utils/constants'

import * as S from './styles'
import { I18nextContext, useTranslation } from 'gatsby-plugin-react-i18next'

const Header: React.FC = () => {
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { language } = useContext(I18nextContext)

  const isCzech = language === 'cs'
  const isEnglish = language === 'en'

  const MENU = [
    {
      link: '/projekty',
      label: t('header.projects'),
    },
    {
      link: '/portal-dobrovolnika',
      label: t('header.portal'),
      locale: 'cs',
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
            {isCzech &&
              MENU.map(({ link, label }) => (
                <Link key={label} to={link} size={ButtonSize.Small}>
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
                to={'/'}
                size={ButtonSize.Small}
                language="en"
              >
                {t('header.english')}
              </Link>
            )}
            {isEnglish && (
              <Link
                key={t('header.czech') as string}
                to="/"
                size={ButtonSize.Small}
                language="cs"
              >
                {t('header.czech')}
              </Link>
            )}
          </S.DesktopLinksContainer>
          <S.MobileLinksContainer>
            {isCzech && (
              <Link
                key={t('header.english') as string}
                to={'/'}
                size={ButtonSize.Small}
                language="en"
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
                language="cs"
              >
                {t('header.czech')}
              </Link>
            )}
          </S.MobileLinksContainer>
        </S.Container>

        {mobileMenuOpen && (
          <S.MobileMenu>
            {MENU.map(({ link, label }) => (
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
