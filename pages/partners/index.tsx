import type { NextPage, GetStaticProps } from "next";
import { useMemo, useState } from "react";
import strings from "content/strings.json";
import FinancialPartners from "components/partners/sections/financial";
import ExpertsPartners from "components/partners/sections/experts";
import { Layout, Section, SectionContent } from "components/layout";
import * as S from "components/partners/styles";
import Tabs from "components/tabs";
import { siteData } from "lib/site-data";
import { Article } from "lib/data-sources/blog";
import { PortalPartner } from "lib/airtable/partner";
import { ButtonLink } from "components/links";
import { Route } from "lib/routing";

type PageProps = {
  partners: readonly PortalPartner[];
  blogPosts: readonly Article[];
};

const Page: NextPage<PageProps> = ({ partners, blogPosts }) => {
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
      <>
        <Section>
          <SectionContent>
            <S.Heading>{msg.title}</S.Heading>
            <S.Tagline>{msg.description}</S.Tagline>
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

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const partners = siteData.partners;
  const blogPosts = siteData.blogPosts
    .filter((post) => post.tags.some((t) => t === "partners"))
    .reverse()
    .slice(0, 3);
  return {
    props: {
      partners,
      blogPosts,
    },
  };
};

export default Page;
