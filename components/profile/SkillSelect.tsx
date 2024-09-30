import { useEffect, useState } from "react";

import clsx from "clsx";
import Select from "react-select";

import defaultOptions from "~/src/tags.json";

type Option = {
  name: string;
  alsoMatch?: string;
};

export type Props = {
  /** Initial tag selection to display */
  value: string;
  /** If `false`, a Save button will be displayed and changes only sent once the button is clicked */
  sendChangesImmediately?: boolean;
  /** Called when the selection changes */
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export const SkillSelect = ({
  onChange = () => {},
  disabled = false,
  sendChangesImmediately = false,
  value,
}: Props) => {
  /** Sorted list of all options that we provide */
  const sortedOptions: Option[] = defaultOptions.sort(compareOptionsByName);

  /** Currently displayed options, can be filtered by current input */
  const [options, setOptions] = useState(sortedOptions);

  /** Are there pending changes to be saved? Only relevant if `sendChangesImmediately` is `false`. */
  const [pendingChanges, setPendingChanges] = useState(false);

  /** Currently selected options. Initially set from the `value` prop and then updated by user actions. */
  const [selection, setSelection] = useState<ReadonlyArray<Option>>(
    decodeSelection(value),
  );

  // Update selection when the prop changes
  useEffect(() => {
    setSelection(decodeSelection(value));
    setPendingChanges(false);
  }, [value]);

  return (
    <div>
      <label className="mb-2 block">Co umíš, čím se zabýváš?</label>
      <Select
        options={options}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.name}
        value={selection}
        onChange={(selection) => {
          setSelection(selection);
          setPendingChanges(true);
          if (sendChangesImmediately) {
            onChange(encodeSelection(selection));
          }
        }}
        placeholder="copywriting, TypeScript, právo, dotace, operations, …"
        filterOption={() => true /* we have our own filtering logic */}
        noOptionsMessage={() => "Žádný tag neodpovídá"}
        onInputChange={(inputValue) =>
          setOptions(getMatchingOptions(sortedOptions, inputValue))
        }
        isDisabled={disabled}
        isClearable={false}
        isMulti
      />
      <p className="typo-caption my-2 text-balance">
        Když tohle víme, můžeme ti lépe nabídnout příležitosti k zapojení nebo
        propojení s ostatními.
      </p>
      {!sendChangesImmediately && (
        <button
          className={clsx(pendingChanges ? "btn-primary" : "btn-disabled")}
          disabled={!pendingChanges}
          onClick={() => {
            onChange(encodeSelection(selection));
            setPendingChanges(false);
          }}
        >
          Uložit změny
        </button>
      )}
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

/** How well does an option fit a given query? */
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

/** Filter a list of options using given user input */
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
