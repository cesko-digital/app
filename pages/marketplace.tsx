import { NextPage, GetStaticProps } from "next";
import { Layout, Section, SectionContent } from "components/layout";
import { Body, Heading1 } from "components/typography";
import { ButtonAsLink } from "components/links";
import { ButtonSize } from "components/buttons/button/enums";
import { siteData } from "lib/site-data";
import strings from "content/strings.json";
import DateTime from "components/datetime";
import { toHTML } from "slack-markdown";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  compareOffersByTime,
  MarketPlaceOffer,
} from "lib/airtable/market-place";

type PageProps = {
  offers: MarketPlaceOffer[];
};

const MarketPlace: NextPage<PageProps> = ({ offers }) => {
  return (
    <Layout
      crumbs={[{ label: "Marketplace" }]}
      head={{
        title: "Marketplace",
        description: "Příležitosti k zapojení v projektech mimo Česko.Digital",
      }}
    >
      <Section>
        <SectionContent>
          <Heading1>{strings.pages.dashboard.marketplaceOffers}</Heading1>
          <Body>
            Pomáhat můžeš i mimo komunitu. Díky službě Marketplace můžeš pomoci
            jakékoliv neziskové nebo veřejno-správní organizaci, která v tuto
            chvíli nemá projekt v Česko.Digital. Těmto organizacím Marketplace
            umožňuje snadno poptat kohokoliv v komunitě na pomoc s jednorázovými
            úkoly a v rámci krátkodobé spolupráci. Jak konkrétně službu využít a
            jak celý proces probíhá je{" "}
            <a href="https://cesko-digital.atlassian.net/wiki/spaces/CD/pages/87462947/Market-place+v+esko.Digital">
              vysvětleno na naší wiki
            </a>
            .
          </Body>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          <div className="marketplace-list">
            {offers.length === 0 && <EmptyPlaceholder />}
            {offers.map((offer) => (
              <Offer key={offer.id} {...offer} />
            ))}
          </div>
        </SectionContent>
      </Section>
    </Layout>
  );
};

const EmptyPlaceholder = () => (
  <div className="min-h-[200px] italic max-w-prose">
    <Body>
      Aktuálně nejsou zveřejněny žádné poptávky. Pokud nějakou chcete přidat,
      napište v našem Slacku do kanálu{" "}
      <a href="https://cesko-digital.slack.com/archives/CLVAH28P3">
        #market-place
      </a>
      . Tam si poptávky všimne editor, který ji následně pověsí sem na web.
    </Body>
  </div>
);

const Offer = (offer: MarketPlaceOffer) => {
  const date = new Date(offer.createdAt);
  const session = useSession();

  const router = useRouter();
  const [isHighlighted, setHighlighted] = useState(false);

  // We have to differentiate server-side render and client-side render here.
  // The hash part of the URL is only accessible during the client-side render,
  // so we have to wait for it.
  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    setHighlighted(hash === offer.id);
  }, [router, offer]);

  let htmlContent = toHTML(offer.text);
  htmlContent = "<p>" + htmlContent.replaceAll("<br>", "</p><p>") + "</p>";

  return (
    <div
      id={offer.id}
      className={`mb-10 pb-10 border-solid border-f0f0f2 border-b last:border-none marketplace-offer ${
        isHighlighted ? "highlighted" : ""
      }`}
    >
      <div>
        <h3 className="mt-0">{offer.title!}</h3>
        <div
          className="mb-3 text"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        <p className="text-sm">
          Poptává {offer.ownerName} od{" "}
          <DateTime date={date} style="date-only" />
        </p>
      </div>
      {session.status !== "authenticated" && (
        <ButtonAsLink
          to={`mailto:${offer.contactEmail}`}
          size={ButtonSize.Small}
          inverted
        >
          Ozvat se mailem
        </ButtonAsLink>
      )}
      {session.status === "authenticated" && (
        <ButtonAsLink
          to={offer.slackThreadUrl}
          size={ButtonSize.Small}
          inverted
        >
          Reagovat na Slacku
        </ButtonAsLink>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const offers = siteData.marketPlaceOffers
    // Only display published offers
    .filter((offer) => offer.state === "published")
    // Let’s filter out offers with no title just to be sure
    .filter((offer) => !!offer.title)
    // Sort by creation time
    .sort(compareOffersByTime)
    // Last created, first displayed
    .reverse();
  return {
    props: { offers },
    revalidate: 60, // update every minute
  };
};

export default MarketPlace;
