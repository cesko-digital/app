import { Body, Heading2 } from "components/typography";
import styled from "styled-components";
import strings from "content/strings.json";
import { MarkdownString } from "lib/utils";
import RenderMarkdown from "components/shared/markdown";

interface Props {
  text: MarkdownString;
}

const AboutProject: React.FC<Props> = ({ text: description }) => {
  return (
    <Wrapper>
      <Heading2>{strings.pages.project.about.title}</Heading2>
      <Body>
        <RenderMarkdown source={description} />
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  > ${Body} {
    margin-top: 12px;
  }
`;

export default AboutProject;
