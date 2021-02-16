import React from 'react'
import { Story, Meta } from '@storybook/react'
import styled from 'styled-components'

import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Body,
  BodyBig,
  BodySmall,
} from '.'

const story: Meta = {
  title: 'Typography',
}

const Container = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 50px;
  }
`

const Template: Story = () => (
  <Container>
    <Heading1>Měníme Česko k lepšímu</Heading1>
    <Heading2>Mám nápad na projekt</Heading2>
    <Heading3>Chcete vědět, na čem pracujeme? </Heading3>
    <Heading4>Uživatelé v hlavní roli</Heading4>
    <BodyBig>
      Ve svém volném čase pomáháme neziskovým organizacím a státu s digitalizací
      a děláme tak Česko lepším místem k životu. Chceme se stát lídrem v
      expertním dobrovolnictví v oblasti inovací a digitálních technologií v
      Evropě.
    </BodyBig>
    <Body>
      Jsme komunita expertních dobrovolníků nejen z IT, kteří ve svém volném
      čase pomáhají státu i nestátním organizacím a dělají tak Česko lepším
      místem k životu.
    </Body>
    <BodySmall>
      ...a taky skrz cookies měníme Česko k lepšímu. Používáním webu s tím
      vyjadřujete souhlas.
    </BodySmall>
  </Container>
)

export const Default = Template.bind({})

export default story
