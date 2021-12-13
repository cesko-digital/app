import * as S from "./styles";
import LogoList from "components/logo-list";
import strings from "content/strings.json";
import { PortalPartner } from "lib/portal-types";

interface PartnersProps {
  partners: PortalPartner[];
}

const Partners: React.FC<PartnersProps> = ({ partners }) => {
  return (
    <S.Wrapper>
      <S.MainTitle>
        {strings.pages.homepage.sections.partners.title}
      </S.MainTitle>
      <LogoList items={partners} />
    </S.Wrapper>
  );
};

export default Partners;
