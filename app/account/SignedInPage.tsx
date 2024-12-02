"use client";

import Image from "next/image";

import { Slack } from "~/components/icons/services";
import { Diskutuj } from "~/components/icons/services";
import { SimpleTabBar } from "~/components/TabBar";
import { Route } from "~/src/routing";

import { NotificationsTab } from "./NotificationsTab";
import { UserProfileTab } from "./UserProfileTab";

export const SignedInPage = () => {
  const tabs = [
    {
      title: "Profil",
      hash: "profile",
      content: <UserProfileTab />,
    },
    {
      title: "Notifikace",
      hash: "notifications",
      content: <NotificationsTab />,
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
        <Image src={Slack} width={24} height={24} alt="" />
        Přidat se do Slacku
      </a>
    </p>
    <p>
      <a
        className="typo-link flex flex-row items-center gap-2"
        href="https://diskutuj.digital/"
      >
        <Image src={Diskutuj} width={24} height={24} alt="" />
        Přejít na Diskutuj.Digital
      </a>
    </p>
  </div>
);
