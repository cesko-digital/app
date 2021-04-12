import React, { useState } from 'react'
import { Layout, Section, SectionContent } from '../../components/layout'
import * as S from '../../page-components/projects/styles'
import { ProjectsProps } from '../../components/sections/projects'
import { Input } from '../../components/inputs'
import { Button } from '../../components/buttons'
import { FormikErrors, useFormik } from 'formik'
import { EMAIL_REGEX } from '../../../api/newsletter'

const submitUrl =
  'https://cd-tools-git-feature-rsvp-ceskodigital.vercel.app/rsvp'

interface ShowAndTellFormValues {
  email: string
}

const ShowAndTell: React.FC<ProjectsProps> = ({ location }) => {
  const [registered, setRegistered] = useState(false)
  const showEmail = new URLSearchParams(location.search).get('id') == null

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

      const body = showEmail
        ? values
        : {
            id: new URLSearchParams(location.search).get('id'),
          }

      fetch(submitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
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
        title: '',
        description: '',
      }}
    >
      <Section>
        <SectionContent>
          <S.Heading>Show&Tell</S.Heading>
          <S.Tagline>Bude to super!</S.Tagline>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <S.ProjectsHeading>Program</S.ProjectsHeading>
          {showEmail && !registered && (
            <Input
              name="email"
              placeholder="Vaše emailová adresa"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              invalid={form.errors.email != null}
            />
          )}
          <Button onClick={form.handleSubmit}>
            {registered ? 'Je to tam!' : 'Chci to do kalendáře!'}
          </Button>
        </SectionContent>
      </Section>
    </Layout>
  )
}

export default ShowAndTell
