import { StyledButtonProps } from "components/buttons/button";
import { ButtonSize } from "components/buttons";
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
    const href = rest.disabled ? "" : url ?? "";
    return (
      <S.StyledLink href={href} {...props}>
        {children}
      </S.StyledLink>
    );
  } else {
    return (
      <S.StyledLink href="" {...props} onClick={onClick}>
        {children}
      </S.StyledLink>
    );
  }
};

export default ButtonAsLink;
