import { PortalPartner, PortalProject } from "lib/portal-types";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Layout, Section, SectionContent } from "components/layout";
import { Projects, JoinUs } from "components/sections";
import Hero from "./hero";
import Numbers from "./numbers";
import OurValues from "./our-values";
import ImageGallery from "./image-gallery";
import Partners from "./partners";

interface Props {
  featuredProjects: readonly PortalProject[];
  partners: readonly PortalPartner[];
  displayDonationBanner?: boolean;
}

const HomePage: React.FC<Props> = (props) => {
  const theme = useContext(ThemeContext);
  const { featuredProjects, partners, displayDonationBanner = false } = props;

  return (
    <Layout showBanner={displayDonationBanner}>
      <Section>
        <Hero />
      </Section>

      <Numbers />

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

export default HomePage;
