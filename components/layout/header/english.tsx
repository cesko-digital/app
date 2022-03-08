import Section from "../section";
import SectionContent from "../section-content";
import Link from "components/shared/link";
import { ButtonSize } from "components/shared/buttons";
import * as S from "./styles";
import strings from "content/strings-en.json";

const HeaderEN: React.FC = () => {
  return (
    <Section as={"header"}>
      <SectionContent verticalPadding={0}>
        <S.Container>
          <Link to="/" size={ButtonSize.Small}>
            <S.Logo />
          </Link>
          <S.DesktopLinksContainer>
            <Link key="czech" to="/" size={ButtonSize.Small}>
              {strings.header.czech}
            </Link>
          </S.DesktopLinksContainer>
        </S.Container>
      </SectionContent>
    </Section>
  );
};

export default HeaderEN;
