import dynamic from "next/dynamic";

const Select = dynamic(() => import("./select"), { ssr: false });

interface Props {
  allSkills: { name: string; count: number }[];
  selectedSkill: any;
  onChange: any;
}

const SelectComponent: React.FC<Props> = ({
  allSkills,
  selectedSkill,
  onChange,
}) => (
  <Select
    allSkills={allSkills}
    selectedSkill={selectedSkill}
    onChange={onChange}
  />
);

export default SelectComponent;
