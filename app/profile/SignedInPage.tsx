import { type Session } from "next-auth";

import { ServerTabBar } from "~/components/ServerTabBar";

type Props = {
  session: Session;
  activeTab: string;
};

export const SignedInPage = ({ session, activeTab }: Props) => {
  return (
    <section>
      <h1 className="typo-title mb-4 mt-7">{session.user?.name}</h1>
      <nav className="border-b border-gravel text-center">
        <ul className="no-scrollbar -mb-px flex overflow-x-auto">
          <ServerTabBar
            title="Dovednosti"
            href="/profile/skills"
            isActive={activeTab === "skills"}
          />
          <ServerTabBar
            title="Newslettery"
            href="/profile/newsletter"
            isActive={activeTab === "newsletter"}
          />
          <ServerTabBar
            title="Notifikace"
            href="/profile/notifications"
            isActive={activeTab === "notifications"}
          />
          <ServerTabBar
            title="Mapa komunity"
            href="/profile/community-map"
            isActive={activeTab === "community-map"}
          />
          <ServerTabBar
            title="Soukromí"
            href="/profile/privacy"
            isActive={activeTab === "privacy"}
          />
        </ul>
      </nav>
    </section>
  );
};
