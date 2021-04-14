import React, { useState } from 'react'
import { Layout, Section, SectionContent } from 'components/layout'
import * as S from 'components/typography'
import { Input } from 'components/inputs'
import { Button } from 'components/buttons'
import { FormikErrors, useFormik } from 'formik'
import { EMAIL_REGEX } from '../../../api/newsletter'
import { PageProps } from 'gatsby'

const submitUrl =
  'https://cd-tools-git-feature-rsvp-ceskodigital.vercel.app/rsvp'

interface ShowAndTellFormValues {
  email: string
}

const ShowAndTell: React.FC<PageProps> = ({ location }) => {
  const [registered, setRegistered] = useState(false)
  const id = new URLSearchParams(location.search).get('id')
  const showEmail = id === null

  const validate = (
    values: ShowAndTellFormValues
  ): FormikErrors<ShowAndTellFormValues> => {
    if (showEmail) {
      if (!EMAIL_REGEX.test(values.email)) {
        return {
          email: 'Nevalidní email',
        }
      }
    }
    return {}
  }

  const onSubmit = (values: ShowAndTellFormValues) => {
    if (!registered) {
      // Fire&Forget
      setRegistered(true)

      const userId = showEmail ? values.email : id

      fetch(submitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: 'recRkEEj5rEkm92IS',
          userId,
        }),
      })
    }
  }

  const form = useFormik<ShowAndTellFormValues>({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit,
  })

  return (
    <Layout
      crumbs={[]}
      seo={{
        title: 'Show&Tell',
        description: 'Prezentace dobrovolníků Česko.Digital',
      }}
    >
      <Section>
        <SectionContent>
          <S.Heading1>Show&Tell</S.Heading1>
          <p>
            Ve čtvrtek 29. dubna v 18:00 proběhne první živé výsílání Show&Tell
            Česko.Digital.
          </p>
          <form onSubmit={form.handleSubmit}>
            {showEmail && !registered && (
              <Input
                name="email"
                placeholder="Vaše emailová adresa"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                invalid={!!form.errors.email}
              />
            )}
            <Button type="submit">
              {registered ? 'Je to tam!' : 'Chci to do kalendáře!'}
            </Button>
          </form>
        </SectionContent>
      </Section>
    </Layout>
  )
}

export default ShowAndTell
