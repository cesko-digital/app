import Select from "react-select";

type Option = {
  label: string;
  value: string;
};

export type Props = {
  value: string;
  className?: string;
  onChange?: (value: string) => void;
};

export const HashtagSelect = ({
  className = "",
  onChange = () => {},
  value,
}: Props) => (
  <Select
    options={values.map((v) => ({ label: v, value: v }))}
    value={decodeSelection(value)}
    onChange={(selection) => onChange(encodeSelection(selection))}
    placeholder="copywriting, TypeScript, právo, dotace, operations, …"
    noOptionsMessage={() => "Žádný tag neodpovídá"}
    className={className}
    isMulti
  />
);

const encodeSelection = (d: readonly Option[]) =>
  d.map((d) => d.label).join(" ");

const decodeSelection = (s: string): Option[] =>
  s
    .split(/ /)
    .filter((s) => s !== "")
    .map((name) => ({ label: name, value: name }));

const values = [
  "#audio",
  "#backend",
  "#cloud",
  "#copywriting",
  "#css",
  "#databáze",
  "#design",
  "#devops",
  "#eventy",
  "#finance",
  "#frontend",
  "#fundraising",
  "#hr",
  "#html",
  "#java",
  "#javascript",
  "#junior",
  "#komunity",
  "#kotlin",
  "#marketing",
  "#medior",
  "#mentor",
  "#mobile",
  "#node",
  "#php",
  "#pr",
  "#product-owner",
  "#projektové-řízení",
  "#python",
  "#react",
  "#scrum",
  "#senior",
  "#strategie",
  "#testování",
  "#typescript",
  "#ui",
  "#ux",
  "#video",
  "#výzkum",
  "#wordpress",
];
