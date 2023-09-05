import { Layout, Section, SectionContent } from "components/layout";
import { Projects, JoinUs } from "components/sections";
import { communitySize } from "lib/utils";
import { PortalProject } from "lib/airtable/project";
import { PortalPartner } from "lib/airtable/partner";
import { defaultTheme } from "components/theme/default";
import Hero from "./hero";
import Numbers from "./numbers";
import OurValues from "./our-values";
import ImageGallery from "./image-gallery";
import Partners from "./partners";

export type Props = {
  featuredProjects: readonly PortalProject[];
  partners: readonly PortalPartner[];
};

export const Page = ({ featuredProjects, partners }: Props) => {
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
