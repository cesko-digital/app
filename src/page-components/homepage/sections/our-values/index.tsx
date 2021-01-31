import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import Value from './value'
import {
  OpennessIcon,
  ProfessionalismIcon,
  EfficiencyIcon,
  ParticipatoryIcon,
  UsersIcon,
  TechnologiesIcon,
  WadgeIcon,
} from 'components/icons'
import * as S from './styles'

const HOMEPAGE_TRANSLATION_KEY = `pages.homepage`
const HOMEPAGE_SECTIONS_TRANSLATION_KEY = `${HOMEPAGE_TRANSLATION_KEY}.sections`
const OUR_VALUES_TRANSLATION_KEY = `${HOMEPAGE_SECTIONS_TRANSLATION_KEY}.ourValues`

enum TranslationKeyPrefix {
  Title = 'title',
  Perex = 'perex',
  Main = 'main',
}

const VALUES_DATA = [
  {
    translationKey: 'openness',
    Icon: OpennessIcon,
  },
  {
    translationKey: 'professionalism',
    Icon: ProfessionalismIcon,
  },
  {
    translationKey: 'efficiency',
    Icon: EfficiencyIcon,
  },
  {
    translationKey: 'participatory',
    Icon: ParticipatoryIcon,
  },
  {
    translationKey: 'users',
    Icon: UsersIcon,
  },
  {
    translationKey: 'technologies',
    Icon: TechnologiesIcon,
  },
]

const OurValues: React.FC = () => {
  const { t } = useTranslation()

  return (
    <S.Container>
      <S.MainTitle>
        {t(
          `${OUR_VALUES_TRANSLATION_KEY}.${TranslationKeyPrefix.Main}.${TranslationKeyPrefix.Title}`
        )}
      </S.MainTitle>
      <S.MainPerex>
        {t(
          `${OUR_VALUES_TRANSLATION_KEY}.${TranslationKeyPrefix.Main}.${TranslationKeyPrefix.Perex}`
        )}
      </S.MainPerex>

      <S.WadgeContainer>
        <S.WadgeIconContainerTop>
          <WadgeIcon />
        </S.WadgeIconContainerTop>

        <S.WadgeIconContainerBottom>
          <WadgeIcon />
        </S.WadgeIconContainerBottom>
      </S.WadgeContainer>
      <S.ValuesWrapper>
        {VALUES_DATA.map(({ translationKey, Icon }) => (
          <Value
            key={translationKey}
            id={translationKey}
            Icon={Icon}
            title={t(
              `${OUR_VALUES_TRANSLATION_KEY}.${translationKey}.${TranslationKeyPrefix.Title}`
            )}
            perex={t(
              `${OUR_VALUES_TRANSLATION_KEY}.${translationKey}.${TranslationKeyPrefix.Perex}`
            )}
          />
        ))}
      </S.ValuesWrapper>
    </S.Container>
  )
}

export default OurValues
