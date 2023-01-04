import * as S from "./styles";
import { ButtonSize } from "components/buttons";

export interface StyledLinkProps {
  size: ButtonSize;
}

export interface LinkProps extends Partial<StyledLinkProps> {
  to: string;
  children: React.ReactNode;
  openInNewTab?: boolean;
  className?: string;
}

const Link: React.FC<LinkProps> = ({
  children,
  size = ButtonSize.Normal,
  openInNewTab = false,
  to: url,
  ...rest
}: LinkProps) => {
  const props = { size, ...rest };
  return openInNewTab ? (
    <S.StyledLink target="_blank" href={url} {...props}>
      {children}
    </S.StyledLink>
  ) : (
    <S.StyledLink href={url} {...props}>
      {children}
    </S.StyledLink>
  );
};

export default Link;
