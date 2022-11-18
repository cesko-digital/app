import { StyledButtonProps } from "components/buttons/button";
import { ButtonSize } from "components/buttons";
import { default as NextLink } from "next/link";
import * as S from "./styles";
import { MouseEventHandler } from "react";

/**
 * The component is used where we need to have
 * a Button which behaves AS a Link
 */
export interface ButtonAsLinkProps extends Partial<StyledButtonProps> {
  to?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: React.ReactNode;
  language?: string;
}

const ButtonAsLink: React.FC<ButtonAsLinkProps> = ({
  children,
  onClick,
  size = ButtonSize.Normal,
  to: url,
  inverted,
  ...rest
}: ButtonAsLinkProps) => {
  const props = {
    $inverted: inverted,
    size,
    ...rest,
  };

  if (url) {
    const href = rest.disabled ? "" : url;
    return (
      <NextLink href={href} passHref>
        <S.StyledLink {...props}>{children}</S.StyledLink>
      </NextLink>
    );
  } else {
    return (
      <S.StyledLink {...props} onClick={onClick}>
        {children}
      </S.StyledLink>
    );
  }
};

export default ButtonAsLink;
