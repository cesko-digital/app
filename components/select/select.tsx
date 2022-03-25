import { StylesConfig } from "react-select";
import { StateManagerAdditionalProps } from "react-select/dist/declarations/src/useStateManager";
import { StyledSelect } from "./styles";

interface Props {
  allSkills: { name: string; count: number }[];
  selectedSkill: any;
  onChange: any;
}

const SelectComponent: React.FC<Props> = ({
  allSkills,
  selectedSkill,
  onChange,
}) => {
  const styles: StylesConfig = {
    menu: () => ({
      position: "absolute",
      width: "100%",
      boxShadow: "0 6px 16px rgba(0,0,0,0.08),0 1px 2px rgba(8,8,49,0.12)",
      borderRadius: 8,
    }),
    option: (_: any, state: any) => ({
      color: state.isSelected ? "#0000FF" : "inherit",
      backgroundColor: state.isFocused ? "#f0f0f0" : "#FFF",
      padding: "2px 14px",
    }),
    control: () => ({
      display: "flex",
      width: "100%",
      boxShadow: "0 6px 16px rgba(0,0,0,0.08),0 1px 2px rgba(8,8,49,0.12)",
      borderRadius: 8,
    }),
  };

  const options = allSkills.map((s) => ({
    value: s.name,
    label: `${s.name} (${s.count})`,
  }));

  return (
    <StyledSelect
      styles={styles}
      options={options}
      isSearchable={false}
      value={options.filter((option) => option.value === selectedSkill)}
      onChange={onChange}
    />
  );
};

export default SelectComponent;
