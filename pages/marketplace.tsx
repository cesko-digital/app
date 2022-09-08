import { NextPage, GetStaticProps } from "next";
import { Layout, Section, SectionContent } from "components/layout";
import { Body, Heading1 } from "components/typography";
import { ButtonAsLink } from "components/links";
import { siteData } from "lib/site-data";
import DateTime from "components/datetime";
import { toHTML } from "slack-markdown";
import { useSession } from "next-auth/react";
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
      crumbs={[{ label: "Market-place" }]}
      head={{
        title: "Market-place",
        description:
          "Drobné úpravy a vylepšení, která hledají 1–2 dobrovolníky a díky vaší pomoci se můžou rychle posunout",
      }}
    >
      <Section>
        <SectionContent>
          <Heading1>Market-place</Heading1>
          <Body>
            Drobné úpravy a vylepšení, která hledají 1–2 dobrovolníky a díky
            vaší pomoci se můžou rychle posunout
          </Body>
        </SectionContent>
      </Section>
      <Section>
        <SectionContent>
          {offers.length === 0 && <EmptyPlaceholder />}
          {offers.map((offer) => (
            <Offer key={offer.id} {...offer} />
          ))}
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
  const html = toHTML(offer.text);
  const session = useSession();
  return (
    <div className="mb-10">
      <div className="mb-10">
        <p className="mb-3" dangerouslySetInnerHTML={{ __html: html }} />
        <p className="text-sm">
          Poptává {offer.ownerName} od{" "}
          <DateTime date={date} style="date-only" />
        </p>
      </div>
      {session.status !== "authenticated" && (
        <ButtonAsLink
          to={`mailto:${offer.ownerContactEmail ?? offer.ownerEmail}`}
          inverted
        >
          Ozvat se mailem
        </ButtonAsLink>
      )}
      {session.status === "authenticated" && (
        <ButtonAsLink to={offer.slackThreadUrl} inverted>
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
