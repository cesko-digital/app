import { useEffect, useState } from "react";
import { useUserProfile } from "app/profile/hooks";
import { DistrictSelect } from "./select";
import dynamic from "next/dynamic";

type DistrictStats = Record<string, number>;

// The component has to be imported dynamically since Leaflet doesn’t
// play nice with server-side rendering.
const Map = dynamic(() => import("./map"), { ssr: false });

export const VolunteerMapPrefs = () => {
  const [districts, setDistricts] = useState("");
  const [stats, setStats] = useState<DistrictStats>({});
  const { profile, updateProfile, isUpdating } = useUserProfile();

  // Update districts when profile changes
  useEffect(() => {
    setDistricts(profile?.availableInDistricts ?? "");
  }, [profile]);

  // Reload map data when profile finishes updating
  useEffect(() => {
    const loadData = async () => {
      await fetch("/stats/districts?format=json")
        .then((response) => response.json())
        .then(setStats);
    };
    if (!isUpdating) {
      loadData();
    }
  }, [isUpdating]);

  return (
    <div className="text-lg max-w-prose grid grid-cols gap-7 mb-10">
      <section>
        <label htmlFor="districts" className="block mb-2">
          Ve kterých okresech ČR se vyskytuješ?
        </label>
        <DistrictSelect
          value={districts}
          onChange={(selection) => {
            setDistricts(selection);
            updateProfile({
              availableInDistricts: selection,
            });
          }}
        />
      </section>
      <section className="z-0">
        <p className="mb-2">Ve kterých okresech někdo z Česko.Digital bývá:</p>
        <Map style={{ height: "400px" }} stats={stats} />
      </section>
    </div>
  );
};
