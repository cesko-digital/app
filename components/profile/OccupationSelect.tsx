import { semicolonStrToArr } from "~/src/data/user-profile";

export type Props = {
  occupation?: string;
  disabled?: boolean;
  onChange?: (occupation: string) => void;
};

export const OccupationSelect = ({
  occupation,
  disabled = false,
  onChange = (_) => {},
}: Props) => {
  const options = {
    "private-sector": "Pracuji v soukromém sektoru",
    "non-profit": "Pracuji v neziskové organizaci",
    "state": "Pracuji ve státním sektoru",
    "freelancing": "Jsem na volné noze/freelancer",
    "studying": "Studuji",
    "parental-leave": "Jsem na rodičovské",
    "looking-for-job": "Hledám práci",
    "other": "Jiné",
  };
  const occupationSet = new Set(semicolonStrToArr(occupation));

  return (
    <div>
      <label className="mb-1 block">V jakém prostředí se pohybuješ?</label>
      <p className="typo-caption mb-3">
        Pokud toho děláš víc, klidně vyber více možností.
      </p>

      <div>
        {Object.entries(options).map(([id, label]) => (
          <label key={id} className="mb-1 flex items-center">
            <input
              type="checkbox"
              className="mr-3"
              name="occupation"
              disabled={disabled}
              checked={occupationSet.has(id)}
              onChange={() =>
                onChange(encodeSelection(flip(occupationSet, id)))
              }
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

/**
 * Toggles a value in a set.
 */
function flip<T>(values: Set<T>, value: T): Set<T> {
  const newValues = new Set(values);
  if (newValues.has(value)) {
    newValues.delete(value);
  } else {
    newValues.add(value);
  }
  return newValues;
}

const encodeSelection = (occupation: Set<string>) => {
  return Array.from(occupation).join("; ");
};
