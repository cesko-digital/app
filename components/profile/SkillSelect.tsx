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
  <div>
    <label className="mb-2 block">Co umíš, čím se zabýváš?</label>
    <Select
      options={defaultTags.sort((a, b) => a.name.localeCompare(b.name))}
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
    <p className="typo-caption mt-2 text-balance">
      Když tohle víme, můžeme ti lépe nabídnout příležitosti k zapojení nebo
      propojení s ostatními.
    </p>
  </div>
);

const encodeSelection = (d: readonly Option[]) =>
  d.map((d) => d.name).join("; ");

const decodeSelection = (s: string): Option[] =>
  s
    .split(/; /)
    .filter((s) => s !== "")
    .map((name) => defaultTags.find((tag) => tag.name === name) ?? { name });
