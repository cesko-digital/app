import React from 'react'
import { useFormik } from 'formik'
import * as S from './styles'
import { useValidateNewsletter } from './validations'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { useOnSubmitNewsletter } from './submit'
import { CheckIcon } from 'components/icons'

export interface NewsletterFormValues {
  email: string
}

const Newsletter: React.FC = () => {
  const { t } = useTranslation()

  const validate = useValidateNewsletter()
  const [onSubmit, hasServerError, hasSubscribed] = useOnSubmitNewsletter()

  const form = useFormik<NewsletterFormValues>({
    initialValues: {
      email: '',
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
      {hasSubscribed ? (
        <S.SubscribeDoneWrapper data-test-id="newsletter-submit-success">
          <S.CheckIconWrapper>
            <CheckIcon />
          </S.CheckIconWrapper>
          {t('components.sections.footer.newsletter.subscribed')}
        </S.SubscribeDoneWrapper>
      ) : (
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
            <S.ErrorMessage data-test-id="newsletter-submit-error">
              {hasServerError
                ? t('components.sections.footer.newsletter.serverError')
                : form.errors.email}
            </S.ErrorMessage>
          )}
        </S.Form>
      )}
    </S.Container>
  )
}

export default Newsletter
