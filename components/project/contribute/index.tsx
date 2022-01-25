import { Body, Heading2 } from "components/typography";
import { ButtonSize, SlackButton } from "components/buttons";
import { Route } from "lib/routing";
import * as S from "./styles";
import strings from "content/strings.json";

const Contribute: React.FC = () => {
  const msg = strings.pages.project.about.contribute;
  return (
    <S.Wrapper>
      <Heading2>{msg.title}</Heading2>
      <S.Description>
        Děkujeme všem zapojeným dobrovolníkům i pracovníkům z expertních
        organizací.
      </S.Description>
      <S.Text>
        <S.SlackLink>
          <SlackButton slackLink={Route.joinUs} slackText={msg.buttonText} />
        </S.SlackLink>
        <Body>
          <S.Note>
            {msg.note}
            <S.LinkHome size={ButtonSize.Small} to="/">
              {msg.noteLink}
            </S.LinkHome>
          </S.Note>
        </Body>
      </S.Text>
    </S.Wrapper>
  );
};

export default Contribute;
