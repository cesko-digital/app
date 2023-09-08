import { Layout, Section, SectionContent } from "components/layout";
import { Projects, JoinUs } from "components/sections";
import { communitySize, loremIpsum } from "lib/utils";
import { PortalProject } from "lib/airtable/project";
import { PortalPartner } from "lib/airtable/partner";
import { defaultTheme } from "components/theme/default";
import { Body, Heading2 } from "components/typography";
import { ButtonLink } from "components/links";
import Hero from "./hero";
import Numbers from "./numbers";
import OurValues from "./our-values";
import ImageGallery from "./image-gallery";
import Partners from "./partners";
import Image from "next/image";
import { Route } from "lib/routing";
import { CzechiaMapBitmap } from "components/illustrations";

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

      <SupportUsBox />

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

const SupportUsBox = () => (
  <section className="max-w-content m-auto p-5 mb-20 -mt-10">
    <div className="rounded-lg border-lightGray border-2 grid md:grid-cols-3 gap-7 p-7 lg:p-20 overflow-clip">
      <div className="flex flex-col gap-7 md:col-span-2 max-md:order-2">
        <Heading2>Podpořte změnu Česka finančně</Heading2>
        <Body>{loremIpsum}</Body>
        <div>
          <ButtonLink to={Route.caseForSupport}>Chci vědět víc</ButtonLink>
        </div>
      </div>
      <div className="relative">
        {/* The left position is here to improve pattern clipping on large displays.
        The max width is reset to fight some crazy global styling rule about all images. */}
        <Image
          src={CzechiaMapBitmap}
          className="left-[5px] max-w-none w-full md:absolute md:w-[768px] md:h-[416px]"
          alt=""
        />
      </div>
    </div>
  </section>
);
