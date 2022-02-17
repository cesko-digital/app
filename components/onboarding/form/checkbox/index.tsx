import * as S from "./styles";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  label?: string;
  id: string;
  isValid?: boolean;
  validationMessage?: string;
}

const Checkbox = (props: CheckboxProps) => {
  const isValid = typeof props.isValid !== "undefined" ? props.isValid : true;
  const { label, children, id, ...forwardedProps } = props;

  return (
    <S.CheckboxWrapper className={props.className}>
      <S.Input type="checkbox" {...forwardedProps} id={id} isValid={isValid} />
      <S.CheckboxLabel htmlFor={id}>{label}</S.CheckboxLabel>
      {children}
    </S.CheckboxWrapper>
  );
};

export default Checkbox;
