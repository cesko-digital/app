import { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Layout, Section, SectionContent } from "components/layout";
import { Projects, JoinUs } from "components/sections";
import { ThemeContext } from "styled-components";
import { communitySize, shuffleInPlace } from "lib/utils";
import { PortalProject } from "lib/airtable/project";
import { PortalPartner } from "lib/airtable/partner";
import {
  Hero,
  OurValues,
  Numbers,
  ImageGallery,
  Partners,
} from "components/home";
import { filterUndefines, getDataSource } from "lib/site-data";

type PageProps = {
  featuredProjects: readonly PortalProject[];
  partners: readonly PortalPartner[];
};

const Page: NextPage<PageProps> = ({ featuredProjects, partners }) => {
  const theme = useContext(ThemeContext);
  const router = useRouter();
  const displayBanner = !!router.query.banner;

  return (
    <Layout showBanner={displayBanner}>
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
  const dataSource = getDataSource();
  const allPartners = await dataSource.partners();
  const allProjects = await dataSource.projects();
  const partners = allPartners.filter((p) =>
    p.categories.some((c) => c === "homepage")
  );
  const canBeFeatured = (p: PortalProject) =>
    p.state === "finished" || p.state === "incubating" || p.state === "running";
  const featuredProjects = shuffleInPlace(
    allProjects.filter(canBeFeatured)
  ).slice(0, 3);
  return {
    props: filterUndefines({
      featuredProjects,
      partners,
    }),
    // regenerate once an hour, mostly to just pick a new set of featured projects
    revalidate: 60 * 60,
  };
};

export default Page;
