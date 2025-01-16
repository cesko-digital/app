"use client";

import { signIn, useSession } from "next-auth/react";

import { usePatchedJSONResource } from "~/components/hooks/resource";
import { type UserProfile } from "~/src/data/user-profile";
import { setFlag } from "~/src/flags";
import { Route } from "~/src/routing";

export const ProfileVisibilityPrefs = () => {
  const { status: sessionStatus } = useSession();
  return (
    <div className="mb-10">
      {sessionStatus === "loading" && <LoadingSpinner />}
      {sessionStatus === "authenticated" && <ProfileVisibilityButton />}
      {sessionStatus === "unauthenticated" && <SignedOutText />}
    </div>
  );
};

const Note = ({ children }: { children: React.ReactNode }) => (
  <p className="typo-caption ml-6 mt-1 text-balance">{children}</p>
);

const ProfileVisibilityButton = () => {
  const {
    model: model,
    updating,
    setModel,
  } = usePatchedJSONResource<UserProfile>({
    url: "/account/me",
    writeKeys: ["privacyFlags"],
  });

  return (
    <div>
      <label className="mb-1 flex items-center">
        <input
          checked={!!model?.privacyFlags.includes("enablePublicProfile")}
          type="checkbox"
          className="mr-3"
          disabled={updating}
          onChange={(e) => {
            if (model) {
              setModel({
                ...model,
                privacyFlags: setFlag(
                  model.privacyFlags,
                  "enablePublicProfile",
                  e.target.checked,
                ),
              });
            }
          }}
        ></input>
        Chci mít veřejný profil
      </label>
      <Note>Může pár minut trvat, než se tato změna projeví.</Note>
    </div>
  );
};

const LoadingSpinner = () => (
  <>
    <div className="w-[50ex] animate-pulse rounded-lg bg-gray indent-[-9999px]">
      Načítám…
    </div>
    <Note>Načítám…</Note>
  </>
);

const SignedOutText = () => (
  <>
    <div>
      Tip:{" "}
      <a
        className="typo-link"
        onClick={(e) => {
          e.preventDefault();
          return signIn();
        }}
      >
        Když se přihlásíš
      </a>
      , můžeš tady zveřejnit svůj profil.
    </div>
    <Note>
      <a className="typo-link" href={Route.register()}>
        Nebo si založ nový účet
      </a>
      , pokud žádný nemáš.
    </Note>
  </>
);
