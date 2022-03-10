import { useMemo, useState } from "react";
import { PortalPartner } from "lib/portal-types";
import { Article } from "lib/related-blog-posts";
import { Layout, Section, SectionContent } from "components/layout";
import strings from "content/strings.json";
import FinancialPartners from "./sections/financial";
import ExpertsPartners from "./sections/experts";
import BecomePartner from "./sections/become-partner";
import * as S from "./styles";
import Tabs from "./tabs";

export type PageProps = {
  partners: readonly PortalPartner[];
  blogPosts: readonly Article[];
};

export const PartnersPage: React.FC<PageProps> = ({ partners, blogPosts }) => {
  const msg = strings.pages.partners;
  const sections = [
    {
      key: "financial",
      label: msg.tabs.financial.title,
      component: (
        <FinancialPartners partners={partners} blogPosts={blogPosts} />
      ),
    },
    {
      key: "experts",
      label: msg.tabs.experts.title,
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
      crumbs={[{ label: msg.navigation.partners }]}
      head={{
        title: msg.metadata.title,
        description: msg.metadata.description,
      }}
    >
      <Section>
        <SectionContent>
          <S.Heading>{msg.title}</S.Heading>
          <S.Tagline>{msg.description}</S.Tagline>
          <Tabs items={sections} onChange={setActiveSectionKey} />
        </SectionContent>
      </Section>
      {ActiveSection}
      <BecomePartner />
    </Layout>
  );
};
