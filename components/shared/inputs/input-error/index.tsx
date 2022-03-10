import * as S from "./styles";

export interface InputErrorProps {
  dark?: boolean;
  children?: React.ReactNode;
}

const InputError: React.FC<InputErrorProps> = ({
  dark = false,
  children,
  ...rest
}: InputErrorProps) => (
  <S.InputError dark={dark} {...rest}>
    {children}
  </S.InputError>
);

export default InputError;
