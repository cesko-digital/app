import * as S from "./styles";
import { ButtonSize } from "components/buttons";

export interface StyledLinkProps {
  size: ButtonSize;
}

export interface LinkProps extends Partial<StyledLinkProps> {
  to: string;
  children: React.ReactNode;
  language?: string;
}

const Link: React.FC<LinkProps> = ({
  children,
  size = ButtonSize.Normal,
  to: url,
  ...rest
}: LinkProps) => {
  const props = { size, ...rest };
  return (
    <S.StyledLink href={url} {...props}>
      {children}
    </S.StyledLink>
  );
};

export default Link;
