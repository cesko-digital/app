import { NotificationFlag } from "lib/airtable/user-profile";
import { useSession } from "next-auth/react";
import { Fragment } from "react";
import { useUserProfile } from "app/profile/hooks";

export const NotificationPrefs = () => {
  const { data: session } = useSession();
  const { profile, updateProfile, isUpdating } = useUserProfile();

  const groups: Partial<Record<NotificationFlag, string>> = {
    receiveNewRoleNotifications: "Když se objeví nová hledaná role",
  };

  const toggleFlag = async (flag: NotificationFlag, checked: boolean) => {
    if (profile) {
      const oldFlags = profile.notificationFlags;
      const newFlags = checked
        ? [...oldFlags, flag]
        : oldFlags.filter((f) => f !== flag);
      updateProfile({ notificationFlags: newFlags });
    }
  };

  const flags = profile?.notificationFlags || [];

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
              disabled={isUpdating}
              onChange={(e) =>
                toggleFlag("allowNotifications", e.target.checked)
              }
            ></input>
            Chci dostávat upozornění mailem
          </label>
        </div>
      </Section>
      <Section>
        <p>Kdy chceš dostat nový mail na adresu {session?.user?.email}?</p>
        <div className="mb-20">
          {Object.entries(groups).map(([id, description]) => (
            <Fragment key={id}>
              <label className="flex items-center">
                <input
                  checked={flags.includes(id as any)}
                  type="checkbox"
                  className="mr-3"
                  disabled={isUpdating || !flags.includes("allowNotifications")}
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
