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

export const DistrictSelect = ({
  className = "",
  onChange = () => {},
  value,
}: Props) => (
  <Select
    options={options}
    value={decodeSelection(value)}
    onChange={(selection) => onChange(encodeSelection(selection))}
    placeholder="Vyber okres"
    noOptionsMessage={() => "Žádný okres neodpovídá"}
    className={className}
    isMulti
  />
);

const encodeSelection = (d: readonly Option[]) =>
  d.map((d) => d.label).join(", ");

const decodeSelection = (s: string): Option[] =>
  s
    .split(/,\s*/)
    .filter((s) => s !== "")
    .map((name) => ({ label: name, value: name }));
