import { ErrorMessages, NewsletterFormValues } from './'
import { FormikProps } from 'formik'

export function validateEmail({
  email,
  errorMessages,
}: {
  email: string
  errorMessages: { required: string; invalid: string }
}): string | undefined {
  if (!email || email.length === 0) {
    return errorMessages.required
  }

  // Just a simple validation, not 100% bulletproof...
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return errorMessages.invalid
  }

  return undefined
}

export function validateFormFactory(
  errorMessages: ErrorMessages
): (
  values: NewsletterFormValues
) => FormikProps<NewsletterFormValues>['errors'] {
  return (values: NewsletterFormValues) => {
    const email = validateEmail({
      email: values.email,
      errorMessages: errorMessages.email,
    })

    return {
      ...(email && { email }),
    }
  }
}
