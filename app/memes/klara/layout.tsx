import { type Metadata } from "next";

import { SITE_URL } from "~/src/env";

export const metadata: Metadata = {
  title: "Scholleátor",
  description: "Já bych všechny ty Scholleátory zakázala.",
  openGraph: {
    title: "Scholleátor",
    description: "Já bych všechny ty Scholleátory zakázala.",
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/api/klara?answer=J%C3%A1%20bych%20v%C5%A1echny%20ty%20Scholle%C3%A1tory%20zak%C3%A1zala.`,
        width: 1675,
        height: 900,
        alt: "Klara",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
