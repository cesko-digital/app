import { type Metadata } from "next";

import { Breadcrumbs } from "~/components/Breadcrumbs";
import {
  compareOffersByTime,
  getPublishedMarketPlaceOffers,
} from "~/src/data/market-place";

import { OfferBox } from "./OfferBox";

export const metadata: Metadata = {
  title: "Market-place | Česko.Digital",
};

const Page = async () => {
  const offers = (await getPublishedMarketPlaceOffers())
    .sort(compareOffersByTime)
    .reverse();
  return (
    <main className="m-auto max-w-content px-7 py-20">
      <Breadcrumbs
        path={[{ label: "Homepage", path: "/" }]}
        currentPage="Market-place"
      />

      <h1 className="typo-title mb-10 mt-7">Market-place</h1>
      <p className="mb-10 max-w-prose">
        Pomáhat můžeš i mimo komunitu. Díky službě Market-place můžeš pomoci
        jakékoliv neziskové nebo veřejno-správní organizaci, která v tuto chvíli
        nemá projekt v Česko.Digital. Těmto organizacím Market-place umožňuje
        snadno poptat kohokoliv v komunitě na pomoc s jednorázovými úkoly a v
        rámci krátkodobé spolupráci. Jak konkrétně službu využít a jak celý
        proces probíhá je{" "}
        <a
          className="typo-link"
          href="https://cesko-digital.atlassian.net/wiki/spaces/CD/pages/87462947/Market-place+v+esko.Digital"
        >
          vysvětleno na naší wiki
        </a>
        .
      </p>

      <h2 className="typo-title2 mb-4">Aktivní poptávky</h2>
      <div className="flex flex-col gap-7">
        {offers.map((offer) => (
          <OfferBox key={offer.id} offer={offer} />
        ))}
      </div>
    </main>
  );
};

export default Page;
