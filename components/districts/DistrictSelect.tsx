import Select from "react-select";

import { districts } from "./districts";

type Option = {
  label: string;
  value: string;
};

const options: Option[] = Object.keys(districts)
  .sort()
  .map((name) => ({ label: name, value: name }));

export type Props = {
  value: string;
  className?: string;
  onChange?: (value: string) => void;
};

/** An input that allows to select Czech districts */
export const DistrictSelect = ({
  className = "",
  onChange = () => {},
  value,
}: Props) => (
  <div>
    <label className="mb-2 block">
      Ve kterých okresech ČR býváš k zastižení?
    </label>
    <Select
      options={options}
      value={decodeSelection(value)}
      onChange={(selection) => onChange(encodeSelection(selection))}
      placeholder="Vyber okres"
      noOptionsMessage={() => "Žádný okres neodpovídá"}
      className={className}
      isMulti
    />
    <p className="typo-caption mt-2 text-balance">
      Tahle data sbíráme, abychom mohli propojovat lidi z různých koutů Česka.
      Jestli nechceš, klidně nech pole nevyplněné.
    </p>
  </div>
);

const encodeSelection = (d: readonly Option[]) =>
  d.map((d) => d.label).join(", ");

const decodeSelection = (s: string): Option[] =>
  s
    .split(/,\s*/)
    .filter((s) => s !== "")
    .map((name) => ({ label: name, value: name }));
