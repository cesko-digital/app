import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import * as S from './styles'
import { InputLabel } from 'components/inputs'
import { ButtonSize } from 'components/buttons'

const BecomePartnerForm: React.FC = () => {
  const { t } = useTranslation()
  return (
    <S.FormWrapper>
      <div>
        <InputLabel>{t('pages.partners.form.name.label')}</InputLabel>
        <S.FullWidthInput
          placeholder={t('pages.partners.form.name.placeholder')}
        />
      </div>
      <div>
        <InputLabel>{t('pages.partners.form.email.label')}</InputLabel>
        <S.FullWidthInput
          placeholder={t('pages.partners.form.email.placeholder')}
        />
      </div>
      <div>
        <InputLabel>{t('pages.partners.form.message.label')}</InputLabel>
        <S.FullWidthTextArea
          placeholder={t('pages.partners.form.message.placeholder')}
        />
      </div>
      <div>
        <S.PositionedButton size={ButtonSize.Normal}>
          {t('pages.partners.form.button.label')}
        </S.PositionedButton>
      </div>
    </S.FormWrapper>
  )
}

export default BecomePartnerForm
