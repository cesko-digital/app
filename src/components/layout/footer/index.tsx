import React, { useContext } from 'react'
import { ButtonSize } from 'components/buttons'
import { Link } from 'components/links'
import NewsletterBox from './newsletter-form'
import * as S from './styles'
import { TranslateUrlsContext } from 'gatsby-plugin-translate-urls'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { LINKS } from 'utils/constants'

const Footer: React.FC = () => {
  const { t } = useTranslation()

  const { locale } = useContext(TranslateUrlsContext)

  const isCzech = locale === 'cs'

  const SOCIAL_LINKS = [
    {
      name: t('components.sections.footer.online.facebook'),
      url: 'https://www.facebook.com/cesko.digital',
    },
    {
      name: t('components.sections.footer.online.twitter'),
      url: 'https://twitter.com/CeskoDigital',
    },
    {
      name: t('components.sections.footer.online.linkedin'),
      url: 'https://www.linkedin.com/company/cesko-digital',
    },
    {
      name: t('components.sections.footer.online.github'),
      url: 'https://github.com/cesko-digital',
    },
    {
      name: t('components.sections.footer.online.slack'),
      url: LINKS.joinUs,
    },
  ]

  const PAGE_LINKS = [
    {
      name: t('components.sections.footer.pageLinks.projects'),
      url: '/projects',
      displayLocale: ['cs'],
    },
    {
      name: t('components.sections.footer.pageLinks.blog'),
      url: 'https://blog.cesko.digital',
      displayLocale: ['cs'],
    },
    {
      name: t('components.sections.footer.pageLinks.loginToSlack'),
      url: LINKS.joinUs,
      displayLocale: ['cs'],
    },
    {
      name: t('components.sections.footer.pageLinks.submitProject'),
      url: LINKS.submitProject,
      displayLocale: ['cs'],
    },
    {
      name: t('components.sections.footer.pageLinks.supportUs'),
      url: LINKS.supportUs,
      displayLocale: ['cs'],
    },
    {
      name: t('components.sections.footer.pageLinks.logo'),
      url: LINKS.logo,
      displayLocale: ['cs', 'en'],
    },
    {
      name: t('components.sections.footer.pageLinks.mediaContact'),
      url: 'mailto:pr@cesko.digital',
      displayLocale: ['cs', 'en'],
    },
  ]

  return (
    <S.Wrapper>
      <S.Outer>
        <S.Container>
          <S.Info>
            <S.InfoBlock>
              <S.Heading>
                {t('components.sections.footer.pageLinks.title')}
              </S.Heading>
              <S.Navigation>
                <S.Links>
                  {PAGE_LINKS.filter((l) =>
                    l.displayLocale.includes(locale)
                  ).map(({ name, url }, i) => (
                    <S.LinkItem key={i}>
                      <Link size={ButtonSize.Small} to={url}>
                        {name}
                      </Link>
                    </S.LinkItem>
                  ))}
                </S.Links>
              </S.Navigation>
            </S.InfoBlock>
            <S.InfoBlock>
              <S.Heading>
                {t('components.sections.footer.online.title')}
              </S.Heading>
              <S.Navigation>
                <S.Links>
                  {SOCIAL_LINKS.map(({ name, url }, index) => (
                    <S.LinkItem key={index}>
                      <Link size={ButtonSize.Small} to={url}>
                        {name}
                      </Link>
                    </S.LinkItem>
                  ))}
                </S.Links>
              </S.Navigation>
            </S.InfoBlock>
          </S.Info>
          {isCzech && <NewsletterBox />}
          <S.Note>{t('components.sections.footer.footNote')}</S.Note>
        </S.Container>
      </S.Outer>
    </S.Wrapper>
  )
}

export default Footer
