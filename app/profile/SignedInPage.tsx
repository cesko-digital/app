"use client";

import { type Session } from "next-auth";

import { SimpleTabBar } from "~/components/TabBar";

import { MapTab } from "./MapTab";
import { NewsletterTab } from "./NewsletterTab";
import { NotificationsTab } from "./NotificationsTab";
import { PrivacyTab } from "./PrivacyTab";
import { SkillsTab } from "./SkillsTab";

export const SignedInPage = ({ session }: { session: Session }) => {
  const tabs = [
    {
      title: "Dovednosti",
      hash: "skills",
      content: <SkillsTab />,
    },
    {
      title: "Newslettery",
      hash: "newsletter",
      content: <NewsletterTab userMail={session.user!.email!} />,
    },
    {
      title: "Notifikace",
      hash: "notifications",
      content: <NotificationsTab userEmail={session.user!.email!} />,
    },
    {
      title: "Mapa komunity",
      hash: "community-map",
      content: <MapTab />,
    },
    {
      title: "Soukromí",
      hash: "privacy",
      content: <PrivacyTab />,
    },
  ];
  return (
    <section>
      <h1 className="typo-title mb-4 mt-7">{session.user?.name}</h1>
      <SimpleTabBar items={tabs} />
    </section>
  );
};
