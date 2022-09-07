import { NextPage, GetStaticProps } from "next";
import { Layout, Section, SectionContent } from "components/layout";
import { Body, BodySmall, Heading1 } from "components/typography";
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
          {offers.map((offer) => (
            <Offer key={offer.id} {...offer} />
          ))}
        </SectionContent>
      </Section>
    </Layout>
  );
};

export const Offer = (offer: MarketPlaceOffer) => {
  const date = new Date(offer.createdAt);
  const html = toHTML(offer.text);
  const session = useSession();
  return (
    <div style={{ marginBottom: "40px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Body
          style={{ marginBottom: "10px" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <BodySmall>
          Poptává {offer.ownerName} od{" "}
          <DateTime date={date} style="date-only" />
        </BodySmall>
      </div>
      {session.status !== "authenticated" && (
        <ButtonAsLink to={`mailto:${offer.ownerEmail}`} inverted>
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
