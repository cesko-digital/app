import { PortalPartner } from "lib/portal-types";
import type { NextPage, GetStaticProps } from "next";
import { useMemo, useState } from "react";
import strings from "content/strings.json";
import FinancialPartners from "components/partners/sections/financial";
import ExpertsPartners from "components/partners/sections/experts";
import BecomePartner from "components/partners/sections/become-partner";
import { Layout, Section, SectionContent } from "components/layout";
import * as S from "components/partners/styles";
import Tabs from "components/tabs";
import { prepareToSerialize } from "lib/utils";
import { dataSource } from "lib/data-source";

type PageProps = {
  partners: PortalPartner[];
};

const Page: NextPage<PageProps> = ({ partners }) => {
  const msg = strings.pages.partners;
  const sections = [
    {
      key: "financial",
      label: msg.tabs.financial.title,
      component: <FinancialPartners partners={partners} />,
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
      seo={{
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

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const partners = await dataSource.getAllPartners();
  return {
    props: prepareToSerialize({
      partners,
    }),
  };
};

export default Page;
