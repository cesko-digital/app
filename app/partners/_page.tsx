import ExpertsPartners from "./sections/experts";
import FinancialPartners from "./sections/financial";
import { Layout, Section, SectionContent } from "components/layout";
import { ButtonLink } from "components/links";
import Tabs from "components/tabs";
import { BodyBig, Heading1 } from "components/typography";
import { PortalPartner } from "lib/airtable/partner";
import { Article } from "lib/data-sources/blog";
import { Route } from "lib/routing";
import { useMemo, useState } from "react";
import styled from "styled-components";

export type Props = {
  partners: readonly PortalPartner[];
  blogPosts: readonly Article[];
};

export const Page = ({ partners, blogPosts }: Props) => {
  const sections = [
    {
      key: "financial",
      label: "Finanční partneři",
      component: (
        <FinancialPartners partners={partners} blogPosts={blogPosts} />
      ),
    },
    {
      key: "experts",
      label: "Expertní partneři",
      component: <ExpertsPartners partners={partners} />,
    },
  ];

  const [activeSectionKey, setActiveSectionKey] = useState<string>(
    sections[0].key
  );

  const ActiveSection = useMemo(() => {
    const componentToRender = sections.find(
      ({ key }) => key === activeSectionKey
    );

    return componentToRender?.component ?? FinancialPartners;
  }, [activeSectionKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout
      crumbs={[{ label: "Partneři" }]}
      head={{
        title: "Partneři",
        description:
          "Nejsme na to sami. Prohlédněte si organizace, díky kterým tu můžeme být s Vámi a měnit Česko k lepšímu.",
      }}
    >
      <>
        <Section>
          <SectionContent>
            <Heading>Pomáhejte s námi!</Heading>
            <Tagline>
              Děkujeme všem našim dárcům, díky kterým tu můžeme být s vámi a
              měnit Česko k lepšímu. Chytrým nasazením digitálních technologií
              můžeme zjednodušit a zlepšit fungování společnosti. Česká
              republika má nejlepší předpoklady k tomu, aby byla digitálním
              premiantem – a zatím není. Pomozte nám to změnit!
            </Tagline>
            <Tabs items={sections} onChange={setActiveSectionKey} />
          </SectionContent>
        </Section>
        {ActiveSection}
        <BecomePartner />
      </>
    </Layout>
  );
};

const BecomePartner = () => (
  <section className="max-w-content m-auto px-5 text-xl mb-20">
    <h2>Staňte se naším partnerem</h2>
    <p className="mb-[60px]">Chcete s námi změnit Česko k lepšímu?</p>
    <ButtonLink to={Route.caseForSupport}>Proč nás podpořit</ButtonLink>
  </section>
);

//
// Styles
//

const Heading = styled(Heading1)`
  margin: 50px 0 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 38px;
  }
`;

const Tagline = styled(BodyBig)`
  margin-bottom: 60px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 28px;
  }
`;

export default Page;
