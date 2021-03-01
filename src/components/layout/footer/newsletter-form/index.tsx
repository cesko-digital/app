import React from 'react'
import { useFormik, FormikProps } from 'formik'
import * as S from './styles'
import { validateFormFactory } from './validations'

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

export const onSubmitNewsletterForm = async (
  values: NewsletterFormValues
): Promise<void> => {
  try {
    const apiResponse = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    if (apiResponse.ok) {
      alert('TODO: Success')
    } else {
      alert('TODO: Error')
    }
  } catch (error) {
    alert('TODO: Error')
  }
}

const Newsletter: React.FC = () => {
  const t = {
    headings: {
      newsletter: 'Newsletter',
    },
    newsletter: {
      note:
        'Chcete vědět, na čem pracujeme? Jednou za měsíc shrneme, co se v komunitě událo a co chystáme.',
      inputPlaceholder: 'Zadejte e-mail',
      inputErr: 'Zadejte prosím validní e-mailovou adresu.',
      subscribe: 'Odebírat',
    },
  }

  const form = useNewsletterForm({
    onSubmit: onSubmitNewsletterForm,
    errorMessages: {
      email: {
        invalid: t.newsletter.inputErr,
        required: t.newsletter.inputPlaceholder,
      },
    },
  })

  const emailInvalid = !!(form.touched.email && form.errors?.email)

  return (
    <S.Container>
      <S.Icon />
      <S.Heading>{t.headings.newsletter}</S.Heading>
      <S.Info>{t.newsletter.note}</S.Info>
      <S.Form onSubmit={form.handleSubmit}>
        <S.FormControl>
          <S.Input
            dark={true}
            name="email"
            placeholder={t.newsletter.inputPlaceholder}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            value={form.values.email}
            invalid={emailInvalid}
          />
        </S.FormControl>
        <S.Button type="submit">{t.newsletter.subscribe}</S.Button>
        {emailInvalid && <S.ErrorMessage>{form.errors.email}</S.ErrorMessage>}
      </S.Form>
    </S.Container>
  )
}

export default Newsletter
