"use client";

import { type Session } from "next-auth";

import SlackIcon from "~/components/icons/slack";
import { SimpleTabBar } from "~/components/TabBar";
import { Route } from "~/src/routing";

import { NewsletterTab } from "./NewsletterTab";
import { NotificationsTab } from "./NotificationsTab";
import { UserProfileTab } from "./UserProfileTab";

export const SignedInPage = ({ session }: { session: Session }) => {
  const tabs = [
    {
      title: "Profil",
      hash: "profile",
      content: <UserProfileTab />,
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
      title: "Nástroje",
      hash: "tools",
      content: <ToolsTab />,
    },
  ];
  return (
    <section>
      <h1 className="typo-title mb-4 mt-7">Můj účet</h1>
      <SimpleTabBar items={tabs} />
    </section>
  );
};

const ToolsTab = () => (
  <div>
    <p>
      <a
        className="typo-link flex flex-row items-center gap-2"
        href={Route.slackOnboarding}
      >
        <SlackIcon /> Přidat se do Slacku
      </a>
    </p>
  </div>
);
