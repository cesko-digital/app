"use client";

import { type Session } from "next-auth";

import { TabBar } from "~/components/TabBar";

export const SignedInPage = ({ session }: { session: Session }) => {
  return (
    <section>
      <h1 className="typo-title mb-4 mt-7">{session?.user?.name}</h1>
      <TabBar
        items={[
          { key: "skills", title: "Dovednosti" },
          { key: "newsletters", title: "Newslettery" },
          { key: "notifications", title: "Upozornění" },
          { key: "map", title: "Mapa komunity" },
        ]}
      />
    </section>
  );
};
