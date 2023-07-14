import { Heading1 } from "components/typography";
import { Route } from "lib/routing";
import * as S from "./styles";

const Hero = () => {
  return (
    <S.Section>
      <S.Container>
        <S.Card>
          <S.Content>
            <Heading1>Skrz jedničky a nuly měníme Česko k lepšímu</Heading1>
            <S.ShiftedBody>
              Jsme komunita špičkových specialistů z mnoha oborů od IT přes
              projektové řízení až po marketing, kteří chtějí ve svém volném
              čase pomáhat státu i nestátním organizacím a měnit tak Česko k
              lepšímu.
            </S.ShiftedBody>
            <S.ButtonAsLinkElement to={Route.projects}>
              Co děláme
            </S.ButtonAsLinkElement>
            <S.ShiftedButton inverted to={Route.joinUs}>
              Chci se přidat
            </S.ShiftedButton>
            <S.HeroPersonTopCircleImage />
          </S.Content>
        </S.Card>
        <S.Card>
          <S.CzechiaMap />
          <S.HeroTeamCircleImage />
          <S.CircleRight>
            <S.Circle color="#080831" />
          </S.CircleRight>
        </S.Card>
      </S.Container>
      <S.CircleLeft>
        <S.Circle color="#fff6a3" />
      </S.CircleLeft>
      <S.HeroPersonBottomCircleImage />
      <S.CzechiaMapMobile />
    </S.Section>
  );
};

export default Hero;
