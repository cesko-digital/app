import { CzechiaMapBitmap } from "components/illustrations";
import ExpertsPartners from "./sections/experts";
import FinancialPartners from "./sections/financial";
import { Layout, Section, SectionContent } from "components/layout";
import { ButtonLink } from "components/links";
import Tabs from "components/tabs";
import { BodyBig, Heading1 } from "components/typography";
import { PortalPartner } from "lib/airtable/partner";
import { Article } from "lib/data-sources/blog";
import { Route } from "lib/routing";
import Image from "next/image";
import { useMemo, useState } from "react";

export type Props = {
  partners: readonly PortalPartner[];
  blogPosts: readonly Article[];
};

export const Page = ({ partners, blogPosts }: Props) => {
  const sections = [
    {
      key: "financial",
      label: "Finanční partneři",
      component: (
        <FinancialPartners partners={partners} blogPosts={blogPosts} />
      ),
    },
    {
      key: "experts",
      label: "Expertní partneři",
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
      crumbs={[{ label: "Partneři" }]}
      head={{
        title: "Partneři",
        description:
          "Nejsme na to sami. Prohlédněte si organizace, díky kterým tu můžeme být s Vámi a měnit Česko k lepšímu.",
      }}
    >
      <>
        <Section>
          <SectionContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
              <div className="md:col-span-2 flex flex-col gap-7">
                <Heading1>
                  Řešíme to systémově. Máme konkrétní plán, jak na to
                </Heading1>
                <BodyBig>
                  Víme, že žádný systém není možné změnit jednostranně – musíme
                  koordinovaně sjednotit dosavadní, často individuální snažení
                  a aktivity jednotlivých hráčů v systému tak, aby kýžená změna
                  byla dlouhodobě udržitelná.
                </BodyBig>
                <div>
                  <ButtonLink to={Route.caseForSupport}>
                    Chci vědět víc
                  </ButtonLink>
                </div>
              </div>
              <SystemicChangeSquareTile />
            </div>
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

const SystemicChangeSquareTile = () => (
  <a
    className="aspect-square max-w-[400px] bg-white hover:bg-yellow border-it border-2 no-underline text-black"
    href="https://cesko.digital/go/mapa"
  >
    <div className="relative flex flex-col overflow-clip p-10 w-full h-full">
      <Image
        src={CzechiaMapBitmap}
        className="absolute top-19 -right-[200px] opacity-60"
        alt=""
      />
      <h2 className="text-it leading-normal mt-0">
        Mapa
        <br />
        systémové
        <br />
        změny
      </h2>
      <p className="mt-auto mb-0 leading-relaxed">
        Klíčové aktivity a milníky jsme zanesli do mapy. Prohlédněte si ji
        v PDF →
      </p>
    </div>
  </a>
);

export default Page;
