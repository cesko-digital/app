import { notFound } from "next/navigation";

import { getServerSession } from "next-auth";

import { MapTab } from "~/app/profile/MapTab";
import { NewsletterTab } from "~/app/profile/NewsletterTab";
import { NotificationsTab } from "~/app/profile/NotificationsTab";
import { PrivacyTab } from "~/app/profile/PrivacyTab";
import { SkillsTab } from "~/app/profile/SkillsTab";
import { authOptions } from "~/src/auth";

type Props = {
  params: { tab: string };
};

const Page = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user!.email ?? "";

  switch (params.tab) {
    case "skills":
      return <SkillsTab />;
    case "newsletter":
      return <NewsletterTab userMail={userEmail} />;
    case "notifications":
      return <NotificationsTab userEmail={userEmail} />;
    case "community-map":
      return <MapTab />;
    case "privacy":
      return <PrivacyTab />;
    default:
      notFound();
  }
};

export default Page;
