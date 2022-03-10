import * as S from "./styles";
import { ButtonSize } from "./enums";
import { Loader } from "./loader";

export interface StyledButtonProps {
  inverted?: boolean;
  size: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<StyledButtonProps> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = ButtonSize.Normal,
  inverted,
  loading,
  ...rest
}: ButtonProps) => (
  <S.Button $inverted={inverted} size={size} {...rest}>
    {loading ? <Loader /> : children}
  </S.Button>
);

export default Button;
