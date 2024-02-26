"use client";

import { DistrictSelect } from "~/components/districts/DistrictSelect";
import { usePatchedJSONResource } from "~/components/hooks/resource";
import { type UserProfile } from "~/src/data/user-profile";

export const MapTab = () => {
  const { model, setModel } = usePatchedJSONResource<UserProfile>({
    url: "/profile/me",
    writeKeys: ["availableInDistricts"],
  });
  return (
    <section className="mb-10 flex max-w-prose flex-col gap-4">
      <p>
        Jsme Česko.Digital, ne Praha.Digital :) Jestli chceš, dej nám vědět, kde
        se v rámci ČR vyskytuješ, ať můžeme lépe propojit členy komunity z
        různých koutů Česka.
      </p>
      <div>
        <label htmlFor="districts" className="mb-2 block">
          Ve kterých okresech ČR býváš k zastižení?
        </label>
        <DistrictSelect
          value={model?.availableInDistricts ?? ""}
          onChange={(availableInDistricts) =>
            setModel({ ...model!, availableInDistricts })
          }
        />
      </div>
      <p className="typo-caption">
        (Tady bývala ještě hezká mapka ČR s vyznačenými členy a členkami
        Česko.Digital. Dočasně jsme ji sundali, chceme si lépe rozmyslet, jak s
        ní pracovat.)
      </p>
    </section>
  );
};
