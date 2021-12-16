import * as S from "./styles";
import LogoList from "components/logo-list";
import csstrings from "content/strings.json";
import enstrings from "content/strings-en.json";
import { PortalPartner } from "lib/portal-types";

interface Props {
  partners: PortalPartner[];
  lang?: "cs" | "en";
}

const Partners: React.FC<Props> = ({ partners, lang = "cs" }) => {
  const strings = lang === "cs" ? csstrings : enstrings;
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
