import { Body, Heading2 } from "components/typography";
import * as S from "./styles";
import strings from "content/strings.json";

interface Props {
  description: string;
  thankYouText?: string;
  finished: boolean;
}

const AboutProject: React.FC<Props> = ({
  description,
  thankYouText,
  finished,
}) => {
  return (
    <S.Wrapper>
      <Heading2>{strings.pages.project.about.title}</Heading2>
      <Body dangerouslySetInnerHTML={{ __html: description }} />
      {finished && thankYouText && (
        <Body dangerouslySetInnerHTML={{ __html: thankYouText }} />
      )}
    </S.Wrapper>
  );
};

export default AboutProject;
