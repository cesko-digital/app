import { PortalPartner } from "lib/portal-types";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Layout, Section, SectionContent } from "components/layout";
import Hero from "./hero";
import Numbers from "./numbers";
import OurValues from "./our-values";
import ImageGallery from "./image-gallery";
import Partners from "./partners";

type PageProps = {
  partners: PortalPartner[];
};

const EnglishHomePage: React.FC<PageProps> = ({ partners }) => {
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

export default EnglishHomePage;
