import { usePatchedJSONResource } from "~/components/hooks/resource";
import { type UserProfile } from "~/src/data/user-profile";
import { setFlag } from "~/src/flags";

export const PrivacyTab = () => {
  const { model, setModel, updating } = usePatchedJSONResource<UserProfile>({
    url: "/profile/me",
    writeKeys: ["privacyFlags"],
  });

  return (
    <div>
      <p className="mb-4">
        Může nějakou dobu trvat, než se změny těchto nastavení projeví.
      </p>
      <label className="flex items-center">
        <input
          checked={model?.privacyFlags.includes("enablePublicProfile")}
          type="checkbox"
          className="mr-3"
          disabled={updating}
          onChange={(e) =>
            setModel({
              ...model!,
              privacyFlags: setFlag(
                model!.privacyFlags,
                "enablePublicProfile",
                e.target.checked,
              ),
            })
          }
        ></input>
        Chci mít veřejný profil
      </label>
      <div className="typo-caption mb-4 ml-6">
        Budete uvedený v seznamu uživatelů a kdokoliv si bude moct prohlédnou
        údaje jako třeba vaše projekty nebo kontakt na vás
      </div>

      <label className="flex items-center">
        <input
          checked={model?.privacyFlags.includes("hidePublicTeamMembership")}
          type="checkbox"
          className="mr-3"
          disabled={updating}
          onChange={(e) =>
            setModel({
              ...model!,
              privacyFlags: setFlag(
                model!.privacyFlags,
                "hidePublicTeamMembership",
                e.target.checked,
              ),
            })
          }
        ></input>
        Nechci veřejně ukazovat svoje zapojení na projektech
      </label>
      <div className="typo-caption mb-4 ml-6">
        Nebudete uvedený v detailu projektu jako součást týmu
      </div>
    </div>
  );
};
