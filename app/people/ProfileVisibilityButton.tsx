"use client";

import { usePatchedJSONResource } from "~/components/hooks/resource";
import { type UserProfile } from "~/src/data/user-profile";
import { setFlag } from "~/src/flags";

export const ProfileVisibilityButton = () => {
  const {
    model: model,
    updating,
    setModel,
  } = usePatchedJSONResource<UserProfile>({ url: "/account/me" });
  const hasPublicProfile = model?.privacyFlags.includes("enablePublicProfile");

  return (
    <div>
      {model !== undefined && (
        <label className="mb-5 flex items-center">
          <input
            checked={!!model?.privacyFlags.includes("enablePublicProfile")}
            type="checkbox"
            className="mr-3"
            disabled={updating}
            onChange={(e) =>
              setModel({
                ...model,
                privacyFlags: setFlag(
                  model.privacyFlags,
                  "enablePublicProfile",
                  e.target.checked,
                ),
              })
            }
          ></input>
          Chci mít veřejný profil
        </label>
      )}
      {!hasPublicProfile && hasPublicProfile !== undefined && (
        <>
          <p className="mb-3">
            Tvůj profil je teď soukromný. Doporučujeme jej zveřejnit,
            zjednodušuje to vzájemné propojování.
          </p>
          <button
            className="btn-primary mb-5"
            onClick={() =>
              setModel({
                ...model!,
                privacyFlags: setFlag(
                  model!.privacyFlags,
                  "enablePublicProfile",
                ),
              })
            }
          >
            Chci mít veřejný profil
          </button>
        </>
      )}
    </div>
  );
};
