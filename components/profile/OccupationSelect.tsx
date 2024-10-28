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

  return (
    <div>
      <label className="mb-1 block">V jakém prostředí se pohybuješ?</label>
      <p className="typo-caption mb-3">
        Pokud toho děláš víc, vyber, co převažuje.
      </p>

      <div>
        {Object.entries(options).map(([id, label]) => (
          <label key={id} className="mb-1 flex items-center">
            <input
              type="radio"
              className="mr-3"
              name="occupation"
              disabled={disabled}
              checked={occupation === id}
              onChange={() => onChange(id)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
