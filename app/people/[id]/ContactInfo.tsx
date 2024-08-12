"use client";

import { Fragment, useState } from "react";
import Image from "next/image";

import clsx from "clsx";
import { signIn, useSession } from "next-auth/react";

import { Copy as CopyIcon } from "~/components/icons/generic";
import { Gmail, Slack } from "~/components/icons/services";
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
        E-mail <Image src={Gmail} alt="" width={16} height={16} />
      </span>
    }
    content={
      <div className="flex flex-row items-center gap-4">
        <a href={`mailto:${profile.contactEmail}`} className="typo-link">
          {profile.contactEmail}
        </a>
        <CopyToClipboardButton value={profile.contactEmail} />
      </div>
    }
  />
);

const CopyToClipboardButton = ({ value }: { value?: string }) => {
  const [clipboardWriteFinished, setClipboardWriteFinished] = useState(false);
  return (
    <button
      disabled={clipboardWriteFinished}
      className={clsx(clipboardWriteFinished && "opacity-20")}
      title="Zkopírovat do schránky"
      onClick={async (e) => {
        e.preventDefault();
        await navigator.clipboard.writeText(value ?? "");
        setClipboardWriteFinished(true);
      }}
    >
      <Image
        src={CopyIcon}
        width={20}
        height={20}
        alt="Zkopírovat do schránky"
      />
    </button>
  );
};

// TBD: Only display if the current user also has a Slack account?
const SlackRow = ({ profile }: { profile: UserProfile }) => (
  <InfoRow
    label={
      <span className="flex flex-row items-center gap-2">
        Slack <Image src={Slack} alt="" width={16} height={16} />
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
