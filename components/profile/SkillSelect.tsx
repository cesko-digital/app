import Select, { createFilter } from "react-select";

import defaultTags from "~/src/tags.json";

type Option = {
  name: string;
  alsoMatch?: string;
};

export type Props = {
  value: string;
  className?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export const SkillSelect = ({
  className = "",
  onChange = () => {},
  disabled = false,
  value,
}: Props) => (
  <Select
    options={defaultTags}
    getOptionLabel={(option) => option.name}
    getOptionValue={(option) => option.name}
    value={decodeSelection(value)}
    onChange={(selection) => onChange(encodeSelection(selection))}
    placeholder="copywriting, TypeScript, právo, dotace, operations, …"
    noOptionsMessage={() => "Žádný tag neodpovídá"}
    filterOption={createFilter({
      stringify: (option) => `${option.label}, ${option.data.alsoMatch}`,
    })}
    className={className}
    isDisabled={disabled}
    isMulti
  />
);

const encodeSelection = (d: readonly Option[]) =>
  d.map((d) => d.name).join(" ");

const decodeSelection = (s: string): Option[] =>
  s
    .split(/ /)
    .filter((s) => s !== "")
    .map((name) => defaultTags.find((tag) => tag.name === name) ?? { name });
