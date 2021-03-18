import { useState } from 'react'
import { NewsletterFormValues } from '.'

type SubmitFunction = (values: NewsletterFormValues) => Promise<void>

export const useOnSubmitNewsletter = (): [SubmitFunction, boolean, boolean] => {
  const [hasError, setHasError] = useState(false)
  const [hasSubscribed, setHasSubscribed] = useState(false)

  const submit: SubmitFunction = async (values) => {
    setHasError(false)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.status !== 200) {
        setHasError(true)
        return
      }
      setHasSubscribed(true)
    } catch (error) {
      setHasError(true)
    }
  }

  return [submit, hasError, hasSubscribed]
}
