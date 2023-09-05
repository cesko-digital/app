import * as S from "./styles";
import LogoList from "components/logo-list";
import strings from "content/strings.json";
import { PortalPartner } from "lib/airtable/partner";

interface Props {
  partners: readonly PortalPartner[];
}

const Partners = ({ partners }: Props) => {
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
