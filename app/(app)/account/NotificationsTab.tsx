import {
  useJSONResource,
  usePatchedJSONResource,
} from "~/components/hooks/resource";
import { type UserProfile } from "~/src/data/user-profile";
import { setFlag } from "~/src/flags";

export const NotificationsTab = () => {
  return (
    <section className="flex max-w-prose flex-col gap-4">
      <p>
        Abys nemusel*a pravidelně sledovat web nebo náš Slack, můžeme ti občas
        poslat některé důležité věci mailem.
      </p>
      <NewsletterPrefs />
      <NotificationPrefs />
      <p>Odhlásit z odběru se můžeš tady i v každém mailu, který ti přijde.</p>
    </section>
  );
};

const NewsletterPrefs = () => {
  type Subscription = { subscribed: boolean };
  const { model, updating, setModel } = useJSONResource<Subscription>({
    url: "/account/newsletters",
  });
  return (
    <div>
      <label className="flex items-center">
        <input
          checked={model?.subscribed}
          type="checkbox"
          className="mr-3"
          disabled={updating}
          onChange={(e) => setModel({ subscribed: e.target.checked })}
        ></input>
        Chci dostat jednou měsíčně newsletter číst.digital
      </label>
      <p className="typo-caption ml-6 mt-1 text-balance">
        Je to praktický souhrn dění za uplynulý měsíc,{" "}
        <a
          href="https://ceskodigital.ecomailapp.cz/campaigns/render/643/63fd5376313f1656f15325ff001d3c51"
          className="typo-link"
          target="_blank"
        >
          vypadá takhle
        </a>
        .
      </p>
    </div>
  );
};

const NotificationPrefs = () => {
  const { model, updating, setModel } = usePatchedJSONResource<UserProfile>({
    url: "/account/me",
    writeKeys: ["notificationFlags"],
  });

  const toggleRoleNotifications = async (checked: boolean) => {
    if (model) {
      const notificationFlags = setFlag(
        model.notificationFlags,
        "receiveNewRoleNotifications",
        checked,
      );
      setModel({ ...model, notificationFlags });
    }
  };

  const flags = model?.notificationFlags ?? [];

  return (
    <div>
      <label className="flex items-center">
        <input
          checked={flags.includes("receiveNewRoleNotifications")}
          type="checkbox"
          className="mr-3"
          disabled={updating}
          onChange={(e) => toggleRoleNotifications(e.target.checked)}
        ></input>
        Chci dostat mail, když se objeví nová role
      </label>
      <p className="typo-caption ml-6 mt-1 text-balance">
        Většinou to bývá maximálně párkrát do měsíce.
      </p>
    </div>
  );
};
