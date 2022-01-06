import { NextPage, GetStaticProps } from "next";
import { PortalPartner } from "lib/portal-types";
import { Layout, Section, SectionContent } from "components/layout";
import { ThemeContext } from "styled-components";
import { useContext } from "react";
import { prepareToSerialize } from "lib/utils";
import { dataSource } from "lib/data-source";
import {
  Hero,
  OurValues,
  Numbers,
  ImageGallery,
  Partners,
} from "components/home";

type PageProps = {
  partners: PortalPartner[];
};

const Page: NextPage<PageProps> = ({ partners }) => {
  const theme = useContext(ThemeContext);
  return (
    <Layout lang="en">
      <Section>
        <Hero lang="en" />
      </Section>

      <Numbers lang="en" />

      <Section backgroundColor={theme.colors.pebble}>
        <SectionContent>
          <OurValues lang="en" />
        </SectionContent>
      </Section>

      <Section>
        <ImageGallery />
      </Section>

      <Section>
        <SectionContent>
          <Partners partners={partners} lang="en" />
        </SectionContent>
      </Section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const allPartners = await dataSource.getAllPartners();
  const homepagePartners = allPartners.filter((p) =>
    p.categories.some((c) => c === "homepage")
  );
  return {
    props: prepareToSerialize({
      partners: homepagePartners,
    }),
  };
};

export default Page;
