import { Body, Heading2 } from "components/typography";
import { ButtonSize, SlackButton } from "components/buttons";
import { Links } from "components/common-links";
import * as S from "./styles";
import strings from "content/strings.json";
import { MarkdownString } from "lib/utils";
import RenderMarkdown from "components/markdown";

interface Props {
  text: MarkdownString;
}

const Contribute: React.FC<Props> = ({ text }) => {
  const msg = strings.pages.project.about.contribute;
  return (
    <S.Wrapper>
      <Heading2>{msg.title}</Heading2>
      <S.Description>
        <RenderMarkdown source={text} />
      </S.Description>
      <S.Text>
        <S.SlackLink>
          <SlackButton slackLink={Links.joinUs} slackText={msg.buttonText} />
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
