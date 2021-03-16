import React from 'react'
import { useFormik, FormikProps } from 'formik'
import * as S from './styles'
import { validateFormFactory } from './validations'
import { useTranslation } from 'gatsby-plugin-react-i18next'

export interface NewsletterFormValues {
  email: string
}

export interface NewsletterConfig {
  onSubmit: (values: NewsletterFormValues) => void
  errorMessages: ErrorMessages
}

export interface ErrorMessages {
  email: { required: string; invalid: string }
}

export interface NewsletterProps {
  values: NewsletterFormValues
  errors: FormikProps<NewsletterFormValues>['errors']
  touched: FormikProps<NewsletterFormValues>['touched']
  handleSubmit: FormikProps<NewsletterFormValues>['handleSubmit']
  handleChange: FormikProps<NewsletterFormValues>['handleChange']
  handleBlur: FormikProps<NewsletterFormValues>['handleBlur']
}

export const useNewsletterForm = ({
  onSubmit,
  errorMessages,
}: NewsletterConfig): NewsletterProps => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: validateFormFactory(errorMessages),
    onSubmit,
  })

  return {
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
    handleSubmit: formik.handleSubmit,
    handleChange: formik.handleChange,
    handleBlur: formik.handleBlur,
  }
}

export const onSubmitNewsletterForm = (values: NewsletterFormValues): void => {
  alert(JSON.stringify(values, null, 2))
}

const Newsletter: React.FC = () => {
  const { t } = useTranslation()

  const form = useNewsletterForm({
    onSubmit: onSubmitNewsletterForm,
    errorMessages: {
      email: {
        invalid: t('components.sections.footer.newsletter.inputError'),
        required: t('components.sections.footer.newsletter.inputPlaceholder'),
      },
    },
  })

  const emailInvalid = !!(form.touched.email && form.errors?.email)

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
        {emailInvalid && <S.ErrorMessage>{form.errors.email}</S.ErrorMessage>}
      </S.Form>
    </S.Container>
  )
}

export default Newsletter
