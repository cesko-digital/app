import { Heading1 } from "components/typography";
import { Route } from "lib/routing";
import csstrings from "content/strings.json";
import enstrings from "content/strings-en.json";
import * as S from "./styles";

interface Props {
  lang?: "cs" | "en";
}

const Hero: React.FC<Props> = ({ lang = "cs" }) => {
  const strings = lang === "cs" ? csstrings : enstrings;
  return (
    <S.Section>
      <S.Container>
        <S.Card>
          <S.Content>
            <Heading1>{strings.pages.homepage.title}</Heading1>
            <S.ShiftedBody>{strings.pages.homepage.subtitle}</S.ShiftedBody>
            {lang === "cs" && (
              <>
                <S.ButtonAsLinkElement to={Route.projects}>
                  {strings.pages.homepage.whatWeDo}
                </S.ButtonAsLinkElement>
                <S.ShiftedButton inverted to={Route.joinUs}>
                  {strings.header.signUp}
                </S.ShiftedButton>
              </>
            )}
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
