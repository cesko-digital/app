"use client";

import clsx from "clsx";
import { toHTML as slackMarkupToHTML } from "slack-markdown";

import DateTime from "~/components/DateTime";
import useHash from "~/components/hooks/hash";
import { type MarketPlaceOffer } from "~/src/data/market-place";

// TBD: The HTML handling here is dumb and unsafe, can we do better?
export const OfferBox = ({ offer }: { offer: MarketPlaceOffer }) => {
  const date = new Date(offer.createdAt);
  const splitParagraphs = (s: string) =>
    "<p>" + s.replaceAll("<br>", "</p><p>") + "</p>";
  const html = splitParagraphs(slackMarkupToHTML(offer.text));

  const hash = useHash();
  const isHighlighted = hash === offer.id;

  return (
    <div
      className={clsx(
        "grid gap-7 p-7 md:grid-cols-3",
        isHighlighted ? "bg-yellow" : "bg-pebble",
      )}
      id={offer.id}
    >
      <div className="md:col-span-2">
        <h3 className="typo-title3 mb-2">{offer.title}</h3>
        <div
          className="embedded-markdown max-w-prose"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>
      <div className="flex flex-col gap-4 border-white max-md:border-t-2 max-md:pt-7 md:border-l-2 md:px-7">
        <p>
          Poptává {offer.ownerName} od{" "}
          <DateTime date={date} style="date-only" />
        </p>
        <p>
          <a className="typo-link" href={`mailto:${offer.contactEmail}`}>
            {offer.contactEmail}
          </a>
        </p>
        <p>
          <a className="typo-link" href={offer.slackThreadUrl}>
            reagovat na Slacku
          </a>
        </p>
      </div>
    </div>
  );
};
