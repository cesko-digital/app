import { Fragment } from "react";

import { usePatchedJSONResource } from "~/components/hooks/resource";
import {
  type NotificationFlag,
  type UserProfile,
} from "~/src/data/user-profile";

type Props = {
  userEmail: string;
};

export const NotificationsTab = ({ userEmail }: Props) => {
  const { model, updating, setModel } = usePatchedJSONResource<UserProfile>({
    url: "/account/me",
    writeKeys: ["notificationFlags"],
  });

  const toggleFlag = async (flag: NotificationFlag, checked: boolean) => {
    if (model) {
      const oldFlags = model.notificationFlags;
      const newFlags = checked
        ? [...oldFlags, flag]
        : oldFlags.filter((f) => f !== flag);
      setModel({ ...model, notificationFlags: newFlags });
    }
  };

  const groups: Partial<Record<NotificationFlag, string>> = {
    receiveNewRoleNotifications: "Když se objeví nová hledaná role",
  };

  const flags = model?.notificationFlags ?? [];

  return (
    <div className="flex flex-col gap-4">
      <section className="max-w-prose">
        <p className="mb-4">
          Abys nemusel*a pravidelně sledovat web nebo náš Slack, můžeme ti občas
          poslat upozornění na některé důležité věci mailem. Tady si můžeš
          nastavit, jestli o to stojíš a která upozornění tě zajímají.
        </p>
        <div>
          <label className="flex items-center">
            <input
              checked={flags.includes("allowNotifications")}
              type="checkbox"
              className="mr-3"
              disabled={updating}
              onChange={(e) =>
                toggleFlag("allowNotifications", e.target.checked)
              }
            ></input>
            Chci dostávat upozornění mailem
          </label>
        </div>
      </section>

      <section className="max-w-prose">
        <p className="mb-4">
          Kdy chceš dostat nový mail na adresu {userEmail}?
        </p>
        <div className="mb-20">
          {Object.entries(groups).map(([id, description]) => (
            <Fragment key={id}>
              <label className="flex items-center">
                <input
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
                  checked={flags.includes(id as any)}
                  type="checkbox"
                  className="mr-3"
                  disabled={updating || !flags.includes("allowNotifications")}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
                  onChange={(e) => toggleFlag(id as any, e.target.checked)}
                ></input>
                {description}
              </label>
            </Fragment>
          ))}
        </div>
      </section>
    </div>
  );
};
