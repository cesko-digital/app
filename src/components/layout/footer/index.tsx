import React, { useContext } from 'react'
import { ButtonSize } from 'components/buttons'
import { Link } from 'components/links'
import NewsletterBox from './newsletter-form'
import * as S from './styles'
import { I18nextContext, useTranslation } from 'gatsby-plugin-react-i18next'
import { LINKS } from 'utils/constants'

const Footer: React.FC = () => {
  const { t } = useTranslation()
  const { language } = useContext(I18nextContext)

  const isCzech = language === 'cs'

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
      name: t('components.sections.footer.online.youtube'),
      url: 'https://www.youtube.com/channel/UCYMZxCNq_IWI8URpcx2sBwg',
    },
  ]

  const PAGE_LINKS = [
    {
      name: t('components.sections.footer.pageLinks.projects'),
      url: '/projekty',
      displayLocale: ['cs'],
    },
    {
      name: t('components.sections.footer.pageLinks.portal'),
      url: '/portal-dobrovolnika',
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
                    l.displayLocale.includes(language)
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
