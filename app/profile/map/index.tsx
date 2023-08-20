import { useEffect, useState } from "react";
import { useUserProfile } from "app/profile/hooks";
import { DistrictSelect } from "./select";
import { MapMember, MapModel } from "./districts";
import dynamic from "next/dynamic";
import Image from "next/image";

// The component has to be imported dynamically since Leaflet doesn’t
// play nice with server-side rendering.
const Map = dynamic(() => import("./map"), { ssr: false });

export const VolunteerMapPrefs = () => {
  const [districts, setDistricts] = useState("");
  const [mapModel, setMapModel] = useState<MapModel>({});
  const [selectedDistrict, setSelectedDistrict] = useState<string>();
  const { profile, updateProfile, isUpdating } = useUserProfile();

  // Update districts when profile changes
  useEffect(() => {
    setDistricts(profile?.availableInDistricts ?? "");
  }, [profile]);

  // Reload map data when profile finishes updating
  useEffect(() => {
    const loadData = async () => {
      await fetch("/profile/map/members")
        .then((response) => response.json())
        .then(setMapModel);
    };
    if (!isUpdating) {
      loadData();
    }
  }, [isUpdating]);

  // Highlight current user’s districts
  const highlightedDistricts = Object.keys(mapModel).filter((district) =>
    mapModel[district].some((member) => member.slackId === profile?.slackId)
  );

  return (
    <div className="text-lg max-w-prose grid grid-cols gap-7 mb-10">
      <section>
        <p className="mt-0">
          Jsme Česko.Digital, ne Praha.Digital :) Jestli chceš, dej nám vědět,
          kde se v rámci ČR vyskytuješ, ať můžeme lépe propojit členy komunity z
          různých koutů Česka.
        </p>
        <label htmlFor="districts" className="block mb-2">
          Ve kterých okresech ČR býváš k zastižení?
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
        <Map
          style={{ height: "400px" }}
          districts={Object.keys(mapModel)}
          selectedDistrict={selectedDistrict}
          highlightedDistricts={highlightedDistricts}
          onClick={(name) => {
            setSelectedDistrict(selectedDistrict === name ? undefined : name);
          }}
        />
      </section>
      {selectedDistrict && (
        <section>
          <h3 className="mb-2">
            Koho můžeš potkat v okrese {selectedDistrict}
          </h3>
          <div className="grid md:grid-cols-3 gap-7">
            {mapModel[selectedDistrict]?.map((member) => (
              <MemberCard key={member.slackId} member={member} />
            ))}
          </div>
        </section>
      )}
      {!selectedDistrict && (
        <p>
          Klepnutím na špendlík v mapě zobrazíš seznam uživatelů z daného
          okresu. A klepnutím na profil uživatele se ti pak otevře jeho profil
          na Slacku, kdybyste si například chtěli napsat a něco spolu upéct 🥮
        </p>
      )}
    </div>
  );
};

const MemberCard = ({ member }: { member: MapMember }) => (
  <a
    className="flex flex-col items-center pt-4 bg-pebble hover:bg-yellow cursor-pointer rounded-sm no-underline text-black"
    href={member.slackProfileUrl}
    target="_blank"
  >
    <Image
      src={
        member.slackAvatarUrl ||
        "https://data.cesko.digital/people/generic-profile.jpg"
      }
      className="border-it border-2 rounded-full aspect-square object-cover object-top"
      width={70}
      height={70}
      alt=""
    />
    <p>{member.name}</p>
  </a>
);
