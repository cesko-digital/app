import React from 'react'
import { useFormik } from 'formik'
import * as S from './styles'
import { useValidateNewsletter } from './validations'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { useOnSubmitNewsletter } from './submit'

export interface NewsletterFormValues {
  email: string
}

const Newsletter: React.FC = () => {
  const { t } = useTranslation()

  const validate = useValidateNewsletter()
  const [onSubmit, hasServerError] = useOnSubmitNewsletter()

  const form = useFormik<NewsletterFormValues>({
    initialValues: {
      email: 'aaa',
    },
    validate,
    onSubmit,
  })

  const emailInvalid = !!(form.touched.email && form.errors?.email)
  const shouldDisplayError = hasServerError || emailInvalid

  return (
    <S.Container>
      <S.Icon />
      <S.Heading>{t('components.sections.footer.newsletter.title')}</S.Heading>
      <S.Info>{t('components.sections.footer.newsletter.note')}</S.Info>
      <S.Form onSubmit={form.handleSubmit}>
        <S.FormControl>
          <S.Input
            dark={true}
            name="email"
            placeholder={t(
              'components.sections.footer.newsletter.inputPlaceholder'
            )}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.email}
            invalid={emailInvalid}
          />
        </S.FormControl>
        <S.Button type="submit">
          {t('components.sections.footer.newsletter.subscribe')}
        </S.Button>
        {shouldDisplayError && (
          <S.ErrorMessage>
            {hasServerError
              ? t('components.sections.footer.newsletter.serverError')
              : form.errors.email}
          </S.ErrorMessage>
        )}
      </S.Form>
    </S.Container>
  )
}

export default Newsletter
