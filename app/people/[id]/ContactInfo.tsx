"use client";

import { Fragment } from "react";
import Image from "next/image";

import { signIn, useSession } from "next-auth/react";

import { Icons } from "~/components/icons";
import { type UserProfile } from "~/src/data/user-profile";

import { InfoRow } from "./InfoRow";

export const ContactRows = ({ profile }: { profile: UserProfile }) => {
  const { status } = useSession();
  switch (status) {
    case "loading":
      return <InfoRow label="Kontakt" content="Načítám…" />;
    case "unauthenticated":
      return (
        <InfoRow
          label="Kontakt"
          content={
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
          }
        />
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
        E-mail <Image src={Icons.Gmail} alt="" width={16} height={16} />
      </span>
    }
    content={
      <a href={`mailto:${profile.contactEmail}`} className="typo-link">
        {profile.contactEmail}
      </a>
    }
  />
);

// TBD: Only display if the current user also has a Slack account?
const SlackRow = ({ profile }: { profile: UserProfile }) => (
  <InfoRow
    label={
      <span className="flex flex-row items-center gap-2">
        Slack <Image src={Icons.Slack} alt="" width={16} height={16} />
      </span>
    }
    content={
      <a
        href={`slack://user?team=TG21XF887&id=${profile.slackId}`}
        className="typo-link"
      >
        poslat zprávu
      </a>
    }
  />
);
