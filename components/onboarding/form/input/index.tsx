import * as S from "./styles";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  isValid?: boolean;
  validationMessage?: string;
}

const Input = (props: InputProps) => {
  const isValid = typeof props.isValid !== "undefined" ? props.isValid : true;
  const { label, children, ...forwardedProps } = props;

  return (
    <S.InputWrapper>
      <S.InputLabel>{label}</S.InputLabel>
      <S.StyledInput {...forwardedProps} isValid={isValid} />
      {props.isValid === false && (
        <S.ValidationMessage role="alert">
          {props.validationMessage}
        </S.ValidationMessage>
      )}
    </S.InputWrapper>
  );
};

export default Input;
