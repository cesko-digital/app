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
import { useRouter } from 'next/router'
import {
  compareOffersByTime,
  MarketPlaceOffer,
} from "lib/airtable/market-place";
import styles from "./marketplace.module.css";

type PageProps = {
  offers: MarketPlaceOffer[];
};

const MarketPlace: NextPage<PageProps> = ({ offers }) => {
  return (
    <Layout
      crumbs={[{ label: "Marketplace" }]}
      head={{
        title: "Marketplace",
        description:
          "Příležitosti k zapojení v projektech mimo Česko.Digital",
      }}
    >
      <Section>
        <SectionContent>
          <Heading1>{strings.pages.dashboard.marketplaceOffers}</Heading1>
          <Body>
            Příležitosti k zapojení v projektech mimo Česko.Digital
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

  const hash = router.asPath.split('#')[1];
  const isHighlighted = hash && hash == offer.id;
  // console.log(offer.id, isHighlighted)

  let htmlContent = toHTML(offer.text);
  htmlContent = '<p>' + htmlContent.replaceAll('<br>', '</p><p>') + '</p>';

  return (
    <div id={offer.id} className={`mb-10 pb-10 border-solid border-f0f0f2 border-b last:border-none marketplace-offer ${isHighlighted ? 'highlighted' : ''}`}>
      <div>
        <div className="mb-3 text" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <p className="text-sm">
          Poptává {offer.ownerName} od{" "}
          <DateTime date={date} style="date-only" />
        </p>
      </div>
      {session.status !== "authenticated" && (
        <ButtonAsLink
          to={`mailto:${offer.ownerContactEmail ?? offer.ownerEmail}`}
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
