import { Section, SectionContent } from "components/layout";
import strings from "content/strings.json";
import * as S from "./styles";

const BecomePartner: React.FC = () => {
  const msg = strings.pages.partners.becomePartner;
  return (
    <Section>
      <SectionContent verticalPadding={60}>
        <S.Wrapper>
          <S.CenteredTextWrapper>
            <S.Subtitle>{msg.aboveTitle}</S.Subtitle>
            <S.Title>{msg.title}</S.Title>
            <S.Subtitle>
              <a href="mailto:partneri@cesko.digital">partneri@cesko.digital</a>
            </S.Subtitle>
          </S.CenteredTextWrapper>
        </S.Wrapper>
      </SectionContent>
    </Section>
  );
};

export default BecomePartner;
