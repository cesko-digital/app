import { type Metadata } from "next";

import { SITE_URL } from "~/src/env";

export const metadata: Metadata = {
  title: "Yenerátor",
  description: "Já bych všechny ty Yenerátory zakázal.",
  openGraph: {
    title: "Yenerátor",
    description: "Já bych všechny ty Yenerátory zakázal.",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/api/yen?answer=J%C3%A1%20bych%20v%C5%A1echny%20ty%20meme%20gener%C3%A1tory%20zak%C3%A1zal.`,
        width: 1675,
        height: 900,
        alt: "Yen",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
