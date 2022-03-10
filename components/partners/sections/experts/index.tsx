import { Section, SectionContent } from "components/layout";
import { Heading2, Heading3 } from "components/typography";
import LogoList from "components/logo-list";
import { PortalPartner } from "lib/portal-types";
import * as S from "../../styles";
import strings from "content/strings.json";
import { filterPartnersByCategory } from "lib/portal-type-utils";

interface ExpertsPartnersProps {
  partners: readonly PortalPartner[];
}

const ExpertsPartners: React.FC<ExpertsPartnersProps> = ({ partners }) => {
  const submitters = filterPartnersByCategory(partners, "experts.submitters");
  const supporters = filterPartnersByCategory(partners, "experts.supporters");
  const msg = strings.pages.partners.experts;
  return (
    <Section>
      <SectionContent verticalPadding={60}>
        <Heading2>{msg.heading.title}</Heading2>
        <S.PaddedBody>{msg.heading.perex}</S.PaddedBody>
      </SectionContent>
      <SectionContent verticalPadding={0}>
        <Heading3>{msg.submitters.title}</Heading3>
        <S.PaddedBody>{msg.submitters.perex}</S.PaddedBody>
        <S.PaddedBody>
          <LogoList items={submitters} />
        </S.PaddedBody>
      </SectionContent>
      <SectionContent verticalPadding={60}>
        <Heading3>{msg.regularPartners.title}</Heading3>
        <S.PaddedBody>{msg.regularPartners.perex}</S.PaddedBody>
        <S.PaddedBody>
          <LogoList items={supporters} />
        </S.PaddedBody>
      </SectionContent>
    </Section>
  );
};

export default ExpertsPartners;
