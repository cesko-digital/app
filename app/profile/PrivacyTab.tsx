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
      <p className="typo-caption ml-6 mt-1">
        Může nějakou dobu trvat, než se změna nastavení projeví.
      </p>
    </div>
  );
};
