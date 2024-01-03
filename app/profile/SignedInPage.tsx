"use client";

import { type Session } from "next-auth";

import { MapTab } from "~/app/profile/MapTab";
import { SimpleTabBar } from "~/components/TabBar";

import { NewsletterTab } from "./NewsletterTab";
import { NotificationsTab } from "./NotificationsTab";
import { SkillsTab } from "./SkillsTab";

export const SignedInPage = ({ session }: { session: Session }) => {
  const tabs = [
    {
      title: "Dovednosti",
      content: <SkillsTab />,
    },
    {
      title: "Newslettery",
      content: <NewsletterTab userMail={session.user!.email!} />,
    },
    {
      title: "Notifikace",
      content: <NotificationsTab userEmail={session.user!.email!} />,
    },
    {
      title: "Mapa komunity",
      content: <MapTab />,
    },
  ];
  return (
    <section>
      <h1 className="typo-title mb-4 mt-7">{session.user?.name}</h1>
      <SimpleTabBar items={tabs} />
    </section>
  );
};
