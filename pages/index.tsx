import type { NextPage, GetStaticProps } from "next";
import { getAllProjects } from "lib/airtable-import";
import { PortalProject } from "lib/portal-types";
import { Layout, Section, SectionContent } from "components/layout";
//import { Projects, JoinUs } from "components/sections";
import { Hero, OurValues, Numbers, ImageGallery } from "components/home";
import { ThemeContext } from "styled-components";
import { useContext } from "react";

type PageProps = {
  projects: PortalProject[];
};

const Page: NextPage<PageProps> = ({ projects }) => {
  const theme = useContext(ThemeContext);
  return (
    <Layout>
      <Section>
        <Hero />
      </Section>

      <Numbers />

      <Section>
        <SectionContent>
          TBD: Projects
          {/*
          <Projects projects={projects} />
          */}
        </SectionContent>
      </Section>

      <Section>
        <SectionContent>
          TBD: Join Us
          {/*
          <JoinUs />
          */}
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

      {/*
      {partners && partners.length > 0 && (
        <Section>
          <SectionContent>
            <Partners partners={partners} />
          </SectionContent>
        </Section>
      )}
      */}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const apiKey = process.env.AIRTABLE_API_KEY as string;
  return {
    props: {
      projects: await getAllProjects(apiKey),
    },
  };
};

export default Page;
