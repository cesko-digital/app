import React from 'react'
import * as S from './styles'

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

  const form = { values: {}, errors: {} }
  const emailInvalid = false

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
        <S.ErrorMessage visible={emailInvalid}>
          {form.errors.email}
        </S.ErrorMessage>
      </S.Form>
    </S.Container>
  )
}

export default Newsletter
