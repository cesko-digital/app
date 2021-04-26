import React, { useState } from 'react'
import { Layout, Section, SectionContent } from 'components/layout'
import * as S from 'components/typography'
import { Input } from 'components/inputs'
import { Button } from 'components/buttons'
import { FormikErrors, useFormik } from 'formik'
import { EMAIL_REGEX } from '../../api/newsletter'
import { PageProps } from 'gatsby'
import * as Links from 'components/links'
import styled from 'styled-components'

const submitUrl = 'https://cesko.digital/api/rsvp'

interface ShowAndTellFormValues {
  email: string
}

const Rsvp: React.FC<PageProps> = ({ location }) => {
  const [registered, setRegistered] = useState(false)
  const id = new URLSearchParams(location.search).get('id')
  const showEmail = !id

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
        description:
          'Pravidelné živé vysílání prezentace práce dobrovolníků Česko.Digital',
      }}
    >
      <Section>
        <SectionContent>
          <S.Heading1>Show&Tell</S.Heading1>
          <p>
            V rámci Česko.Digital prezentujeme krásné výsledky projektů, ale v
            tiskových zprávách není vidět množství práce dobrovolníků, které za
            úspšchy projektů stojí.
          </p>
          <p>
            Show&Tell má cíl tohle změnit a dát šanci dobrovolníkům prezentovat
            jejich cestu k výsledku.
          </p>
          <p>
            Event se koná jednou měsíčně vždy poslední čtvrtek. Nejbližší
            vysílání se koná <b>29. dubna od 18:00</b> a můžete ho sledovat{' '}
            <Links.Link to="/show-and-tell">zde</Links.Link>.
          </p>
          <Form onSubmit={form.handleSubmit}>
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
          </Form>
        </SectionContent>
      </Section>
    </Layout>
  )
}

const Form = styled.form`
  margin-top: 32px;
  margin-bottom: 50px;
`

export default Rsvp
