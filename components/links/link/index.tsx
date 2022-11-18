import * as S from "./styles";
import { default as NextLink } from "next/link";
import { ButtonSize } from "components/buttons";

export interface StyledLinkProps {
  size: ButtonSize;
}

export interface LinkProps extends Partial<StyledLinkProps> {
  to: string;
  children: React.ReactNode;
  openInNewTab?: boolean;
  language?: string;
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
    <NextLink href={url} passHref>
      <S.StyledLink {...props}>{children}</S.StyledLink>
    </NextLink>
  );
};

export default Link;
