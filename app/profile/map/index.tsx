import { useEffect, useState } from "react";
import { useUserProfile } from "app/profile/hooks";

export const VolunteerMapPrefs = () => {
  const [districts, setDistricts] = useState("");
  const { profile, updateProfile, isUpdating } = useUserProfile();

  const save = () => {
    updateProfile({ availableInDistricts: districts });
  };

  useEffect(() => {
    setDistricts(profile?.availableInDistricts ?? "");
  }, [profile]);

  return (
    <Section>
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
    </Section>
  );
};

const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="text-lg max-w-prose">{children}</section>
);
