import { NextPage, GetStaticProps } from "next";
import { siteData } from "lib/site-data";
import { Layout, Section, SectionContent } from "components/layout";
import { Projects, JoinUs } from "components/sections";
import { communitySize, shuffleInPlace } from "lib/utils";
import { PortalProject } from "lib/airtable/project";
import { PortalPartner } from "lib/airtable/partner";
import { defaultTheme } from "components/theme/default";
import {
  Hero,
  OurValues,
  Numbers,
  ImageGallery,
  Partners,
} from "components/home";

type PageProps = {
  featuredProjects: readonly PortalProject[];
  partners: readonly PortalPartner[];
};

const Page: NextPage<PageProps> = ({ featuredProjects, partners }) => {
  return (
    <Layout>
      <Section>
        <Hero />
      </Section>

      <Numbers memberCount={communitySize} />

      <Section>
        <SectionContent>
          <Projects projects={featuredProjects} />
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          <JoinUs />
        </SectionContent>
      </Section>

      <Section backgroundColor={defaultTheme.colors.pebble}>
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
  const partners = allPartners.filter((p) =>
    p.categories.some((c) => c === "homepage")
  );
  const canBeFeatured = (p: PortalProject) =>
    p.state === "finished" || p.state === "incubating" || p.state === "running";
  const featuredProjects = shuffleInPlace(
    siteData.projects.filter(canBeFeatured)
  ).slice(0, 3);
  return {
    props: {
      featuredProjects,
      partners,
    },
    // regenerate once an hour, mostly to just pick a new set of featured projects
    revalidate: 60 * 60,
  };
};

export default Page;
