import { NotificationFlag, UserProfile } from "lib/airtable/user-profile";
import { Fragment, useState } from "react";

export type Props = {
  userProfile: UserProfile;
  updateNotificationFlags: (newFlags: NotificationFlag[]) => Promise<void>;
};

type Model = {
  updating: boolean;
  flags: NotificationFlag[];
};

export const NotificationPrefs = ({
  userProfile,
  updateNotificationFlags,
}: Props) => {
  const [model, setModel] = useState<Model>({
    updating: false,
    flags: userProfile.notificationFlags,
  });

  const groups: Partial<Record<NotificationFlag, string>> = {
    receiveNewRoleNotifications: "Když se objeví nová hledaná role",
  };

  // Update and save prefs. We display the new state in the UI,
  // disable the UI, and write the new state to the backend. If
  // the write succeeds, the UI is just enabled again, if there is
  // an error, we roll back to previous state.
  const toggleFlag = async (flag: NotificationFlag, checked: boolean) => {
    const oldFlags = model.flags;
    const newFlags = checked
      ? [...oldFlags, flag]
      : oldFlags.filter((f) => f !== flag);
    console.debug(`Updating user notifications to [${newFlags.join("; ")}].`);
    try {
      setModel({ updating: true, flags: newFlags });
      await updateNotificationFlags(newFlags);
      setModel((m) => ({ ...m, updating: false }));
    } catch (e) {
      console.error(e);
      setModel({ updating: false, flags: oldFlags });
    }
  };

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
              checked={model.flags.includes("allowNotifications")}
              type="checkbox"
              className="mr-3"
              disabled={model.updating}
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
                  checked={model.flags.includes(id as any)}
                  type="checkbox"
                  className="mr-3"
                  disabled={model.updating}
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
