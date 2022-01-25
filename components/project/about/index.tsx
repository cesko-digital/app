import { Body, Heading2 } from "components/typography";
import * as S from "./styles";
import strings from "content/strings.json";
import { MarkdownString } from "lib/utils";
import RenderMarkdown from "components/markdown";

interface Props {
  text: MarkdownString;
}

const AboutProject: React.FC<Props> = ({ text: description }) => {
  return (
    <S.Wrapper>
      <Heading2>{strings.pages.project.about.title}</Heading2>
      <Body>
        <RenderMarkdown source={description} />
      </Body>
    </S.Wrapper>
  );
};

export default AboutProject;
