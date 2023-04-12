import { useNotificationFlags } from "app/profile/notifications/hooks";
import { NotificationFlag, UserProfile } from "lib/airtable/user-profile";
import { Fragment } from "react";

type Props = {
  userProfile: UserProfile;
};

export const NotificationPrefs = ({ userProfile }: Props) => {
  const [model, updateModel] = useNotificationFlags();

  const groups: Partial<Record<NotificationFlag, string>> = {
    receiveNewRoleNotifications: "Když se objeví nová hledaná role",
  };

  const toggleFlag = async (flag: NotificationFlag, checked: boolean) => {
    if (model.state === "ready") {
      const oldFlags = model.flags;
      const newFlags = checked
        ? [...oldFlags, flag]
        : oldFlags.filter((f) => f !== flag);
      updateModel(newFlags);
    }
  };

  const ready = model.state === "ready";
  const flags =
    model.state === "ready"
      ? model.flags
      : model.state === "updating"
      ? model.desiredState
      : [];

  return (
    <>
      <Section>
        <p>
          Abys nemusel(a) sledovat pravidelně Slack nebo náš web, můžeme ti
          občas poslat upozornění na některé důležité věci mailem. Tady si můžeš
          nastavit, jestli o to stojíš a která upozornění tě zajímají.
        </p>
        <div>
          <label className="flex items-center">
            <input
              checked={flags.includes("allowNotifications")}
              type="checkbox"
              className="mr-3"
              disabled={!ready}
              onChange={(e) =>
                toggleFlag("allowNotifications", e.target.checked)
              }
            ></input>
            Chci dostávat upozornění mailem
          </label>
        </div>
      </Section>
      <Section>
        <p>Kdy chceš dostat nový mail na adresu {userProfile.email}?</p>
        <div className="mb-20">
          {Object.entries(groups).map(([id, description]) => (
            <Fragment key={id}>
              <label className="flex items-center">
                <input
                  checked={flags.includes(id as any)}
                  type="checkbox"
                  className="mr-3"
                  disabled={!ready}
                  onChange={(e) => toggleFlag(id as any, e.target.checked)}
                ></input>
                {description}
              </label>
            </Fragment>
          ))}
        </div>
      </Section>
    </>
  );
};

const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="text-lg max-w-prose">{children}</section>
);
