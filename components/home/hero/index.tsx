import { Heading1 } from "components/typography";
import { Route } from "lib/utils";
import strings from "content/strings.json";
import * as S from "./styles";

const Hero = () => {
  return (
    <S.Section>
      <S.Container>
        <S.Card>
          <S.Content>
            <Heading1>{strings.pages.homepage.title}</Heading1>
            <S.ShiftedBody>{strings.pages.homepage.subtitle}</S.ShiftedBody>
            <S.ButtonAsLinkElement to={Route.projects}>
              {strings.pages.homepage.whatWeDo}
            </S.ButtonAsLinkElement>
            <S.ShiftedButton inverted to={Route.joinUs}>
              {strings.header.signUp}
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
