"use client";

import { Fragment } from "react";
import Image from "next/image";

import { signIn, useSession } from "next-auth/react";

import { CopyToClipboardButton } from "~/components/CopyToClipboardButton";
import { Gmail, Slack } from "~/components/icons/services";
import { type UserProfile } from "~/src/data/user-profile";

import { InfoRow } from "./InfoRow";

export const ContactRows = ({ profile }: { profile: UserProfile }) => {
  const { status } = useSession();
  switch (status) {
    case "loading":
      return <InfoRow label="Kontakt">Načítám…</InfoRow>;
    case "unauthenticated":
      return (
        <InfoRow label="Kontakt">
          <span>
            Pro zobrazení se musíš{" "}
            <a
              className="typo-link"
              onClick={(e) => {
                e.preventDefault();
                return signIn();
              }}
            >
              přihlásit
            </a>
          </span>
        </InfoRow>
      );
    case "authenticated":
      return (
        <Fragment>
          {profile.contactEmail && <EmailRow profile={profile} />}
          {profile.slackId && <SlackRow profile={profile} />}
        </Fragment>
      );
  }
};

const EmailRow = ({ profile }: { profile: UserProfile }) => (
  <InfoRow
    label={
      <span className="flex flex-row items-center gap-2">
        E-mail <Image src={Gmail} alt="" width={16} height={16} />
      </span>
    }
  >
    <div className="flex flex-row items-center gap-4">
      <a href={`mailto:${profile.contactEmail}`} className="typo-link">
        {profile.contactEmail}
      </a>
      <CopyToClipboardButton
        title="Zkopírovat e-mail do schránky"
        value={profile.contactEmail}
      />
    </div>
  </InfoRow>
);

// TBD: Only display if the current user also has a Slack account?
const SlackRow = ({ profile }: { profile: UserProfile }) => (
  <InfoRow
    label={
      <span className="flex flex-row items-center gap-2">
        Slack <Image src={Slack} alt="" width={16} height={16} />
      </span>
    }
  >
    <a
      href={`slack://user?team=TG21XF887&id=${profile.slackId}`}
      className="typo-link"
    >
      poslat zprávu na Slacku
    </a>
  </InfoRow>
);
