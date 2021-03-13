import React from 'react'
import ButtonAsLink from 'components/links/button-as-link'
import { Heading1, Body } from 'components/typography'
import * as S from './styles'

const Hero: React.FC = () => {
    return (
        <S.Section>
            <S.Container>
                <S.Card>
                    <S.Content>
                        <Heading1>Skrz jedničky a nuly měníme Česko k lepšímu</Heading1>

                        <S.ShiftedBody>Jsme komunita expertních dobrovolníků nejen z IT, kteří ve svém volném čase pomáhají státu i nestátním organizacím a dělají tak Česko lepším místem k životu.</S.ShiftedBody>

                        <ButtonAsLink to="#">Co děláme</ButtonAsLink>
                        <S.ShiftedButton inverted to="#">Chci se zapojit</S.ShiftedButton>

                        <S.image1 />
                    </S.Content>
                </S.Card>

                <S.Card>
                    <S.CzechiaMap />
                    <S.image4 />
                    <S.image5 />
                </S.Card>
            </S.Container>

            <S.image2 />
            <S.image3 />
            <S.CzechiaMapMobile />
        </S.Section>
    );
}

export default Hero;
