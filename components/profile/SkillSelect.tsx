import { useState } from "react";

import Select from "react-select";

import defaultOptions from "~/src/tags.json";

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
}: Props) => {
  const sortedOptions: Option[] = defaultOptions.sort(compareOptionsByName);
  const [options, setOptions] = useState(sortedOptions);
  return (
    <div>
      <label className="mb-2 block">Co umíš, čím se zabýváš?</label>
      <Select
        options={options}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.name}
        value={decodeSelection(value)}
        onChange={(selection) => onChange(encodeSelection(selection))}
        placeholder="copywriting, TypeScript, právo, dotace, operations, …"
        filterOption={() => true /* we have our own filtering logic */}
        noOptionsMessage={() => "Žádný tag neodpovídá"}
        onInputChange={(inputValue) =>
          setOptions(getMatchingOptions(sortedOptions, inputValue))
        }
        className={className}
        isDisabled={disabled}
        isClearable={false}
        isMulti
      />
      <p className="typo-caption mt-2 text-balance">
        Když tohle víme, můžeme ti lépe nabídnout příležitosti k zapojení nebo
        propojení s ostatními.
      </p>
    </div>
  );
};

const compareOptionsByName = (a: Option, b: Option) =>
  a.name.localeCompare(b.name);

/** Convert a string into locale-aware lowercase and remove accents */
const normalize = (s: string) =>
  s
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const getMatchScore = ({ name, alsoMatch }: Option, query: string) => {
  let score = 0;
  // Name starts with query, best match
  if (normalize(name).startsWith(normalize(query))) {
    score += 5;
  }
  // Name includes query, nice
  if (normalize(name).includes(normalize(query))) {
    score += 2;
  }
  // Search synonyms include query
  if (alsoMatch && normalize(alsoMatch).includes(normalize(query))) {
    score += 1;
  }
  return score;
};

const getMatchingOptions = (allOptions: Option[], query: string): Option[] => {
  return allOptions
    .filter((o) => getMatchScore(o, query) > 0)
    .sort((a, b) => getMatchScore(b, query) - getMatchScore(a, query));
};

/** Encode a list of selected options into a single string */
const encodeSelection = (d: readonly Option[]) =>
  d.map((d) => d.name).join("; ");

/** Decode a string with a list of options into an array */
const decodeSelection = (s: string): Option[] =>
  s
    .split(/; /)
    .filter((s) => s !== "")
    .map((name) => defaultOptions.find((tag) => tag.name === name) ?? { name });
