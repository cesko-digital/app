import { useEffect, useState } from "react";
import { useUserProfile } from "app/profile/hooks";
import dynamic from "next/dynamic";

type DistrictStats = Record<string, number>;

// The component has to be imported dynamically since Leaflet doesn’t
// play nice with server-side rendering.
const Map = dynamic(() => import("./map"), { ssr: false });

export const VolunteerMapPrefs = () => {
  const [districts, setDistricts] = useState("");
  const [stats, setStats] = useState<DistrictStats>({});
  const { profile, updateProfile, isUpdating } = useUserProfile();

  // Update profile when the Save button is clicked
  const save = () => {
    updateProfile({ availableInDistricts: districts });
  };

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
        <div className="flex flex-row gap-2">
          <input
            id="districts"
            type="text"
            value={districts}
            disabled={isUpdating}
            className="rounded-md border-2 border-gray p-2 w-full"
            placeholder={profile ? "Brno, Praha, …" : ""}
            onChange={(e) => setDistricts(e.target.value)}
          ></input>
          {isUpdating && (
            <button className="btn-disabled flex-none" disabled={true}>
              Moment…
            </button>
          )}
          {!isUpdating && (
            <button className="btn-primary flex-none" onClick={save}>
              Uložit
            </button>
          )}
        </div>
      </section>
      <section>
        <Map style={{ height: "400px" }} stats={stats} />
      </section>
    </div>
  );
};
