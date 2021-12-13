import * as S from "./styles";
import LogoList from "components/logo-list";
import strings from "content/strings.json";
import { PortalPartner } from "lib/portal-types";
import { Logo } from "components/logo-list";

interface PartnersProps {
  partners: PortalPartner[];
}

const Partners: React.FC<PartnersProps> = ({ partners }) => {
  const partner2logo = (partner: PortalPartner): Logo => ({
    name: partner.name,
    logoUrl: partner.logoUrl,
    linkUrl: partner.url || "#", // TODO
  });
  return (
    <S.Wrapper>
      <S.MainTitle>
        {strings.pages.homepage.sections.partners.title}
      </S.MainTitle>
      <LogoList items={partners.map(partner2logo)} />
    </S.Wrapper>
  );
};

export default Partners;
