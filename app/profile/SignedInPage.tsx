"use client";

import { type Session } from "next-auth";

import { NewsletterTab } from "~/app/profile/NewsletterTab";
import { SimpleTabBar } from "~/components/TabBar";

export const SignedInPage = ({ session }: { session: Session }) => {
  const tabs = [
    { title: "Dovednosti", content: <section>TBD: Dovednosti</section> },
    {
      title: "Newslettery",
      content: <NewsletterTab userMail={session.user!.email!} />,
    },
    { title: "Upozornění", content: <section>TBD: Upozornění</section> },
    { title: "Mapa komunity", content: <section>TBD: Mapa komunity</section> },
  ];
  return (
    <section>
      <h1 className="typo-title mb-4 mt-7">{session.user?.name}</h1>
      <SimpleTabBar items={tabs} />
    </section>
  );
};
