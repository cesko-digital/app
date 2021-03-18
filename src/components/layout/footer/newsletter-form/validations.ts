import { NewsletterFormValues } from './'
import { FormikErrors } from 'formik'
import { useTranslation } from 'gatsby-plugin-react-i18next'

type ValidateFunction = (
  values: NewsletterFormValues
) => FormikErrors<NewsletterFormValues>

export const useValidateNewsletter = (): ValidateFunction => {
  const { t } = useTranslation()

  const validate = ({ email }: NewsletterFormValues) => {
    if (!email || email.length === 0) {
      return {
        email: t('components.sections.footer.newsletter.emailRequiredError'),
      }
    }

    // Just a simple validation, not 100% bulletproof...
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return {
        email: t('components.sections.footer.newsletter.invalidEmailError'),
      }
    }
    return {}
  }

  return validate
}
