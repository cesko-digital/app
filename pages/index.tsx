import type { NextPage, GetStaticProps } from "next";
import { PortalPartner, PortalProject } from "lib/portal-types";
import { Layout, Section, SectionContent } from "components/layout";
import { Projects, JoinUs } from "components/sections";
import { ThemeContext } from "styled-components";
import { useContext } from "react";
import { prepareToSerialize } from "lib/utils";
import { siteData } from "lib/site-data";
import {
  Hero,
  OurValues,
  Numbers,
  ImageGallery,
  Partners,
} from "components/home";

type PageProps = {
  projects: readonly PortalProject[];
  partners: readonly PortalPartner[];
};

const Page: NextPage<PageProps> = ({ projects, partners }) => {
  const theme = useContext(ThemeContext);
  return (
    <Layout>
      <Section>
        <Hero />
      </Section>

      <Numbers />

      <Section>
        <SectionContent>
          <Projects projects={projects.slice(0, 3)} />
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <JoinUs />
        </SectionContent>
      </Section>

      <Section backgroundColor={theme.colors.pebble}>
        <SectionContent>
          <OurValues />
        </SectionContent>
      </Section>

      <Section>
        <ImageGallery />
      </Section>

      {partners.length > 0 && (
        <Section>
          <SectionContent>
            <Partners partners={partners} />
          </SectionContent>
        </Section>
      )}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const allPartners = siteData.partners;
  const homepagePartners = allPartners.filter((p) =>
    p.categories.some((c) => c === "homepage")
  );
  return {
    props: prepareToSerialize({
      projects: siteData.projects,
      partners: homepagePartners,
    }),
  };
};

export default Page;
