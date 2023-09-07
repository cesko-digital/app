import { Section, SectionContent } from "components/layout";
import { Body, Heading2, Heading3 } from "components/typography";
import LogoList from "components/logo-list";
import strings from "content/strings.json";
import { filterPartnersByCategory, PortalPartner } from "lib/airtable/partner";
import styled from "styled-components";

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
        <PaddedBody>{msg.heading.perex}</PaddedBody>
      </SectionContent>
      <SectionContent verticalPadding={0}>
        <Heading3>{msg.submitters.title}</Heading3>
        <PaddedBody>{msg.submitters.perex}</PaddedBody>
        <PaddedBody>
          <LogoList items={submitters} />
        </PaddedBody>
      </SectionContent>
      <SectionContent verticalPadding={60}>
        <Heading3>{msg.regularPartners.title}</Heading3>
        <PaddedBody>{msg.regularPartners.perex}</PaddedBody>
        <PaddedBody>
          <LogoList items={supporters} />
        </PaddedBody>
      </SectionContent>
    </Section>
  );
};

const PaddedBody = styled(Body)`
  padding: 34px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 16px 0;
  }
`;

export default ExpertsPartners;
