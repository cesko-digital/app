import { StyledButtonProps } from "components/buttons/button";
import { ButtonSize } from "components/buttons";
import { default as NextLink } from "next/link";
import styled from "styled-components";
import {
  applyButtonStyles,
  StyledButtonProps as StyledProps,
} from "components/buttons/button/styles";

export interface ButtonAsLinkProps extends Partial<StyledButtonProps> {
  to: string;
  children: React.ReactNode;
}

/** Link styled as a button */
const ButtonLink = ({
  children,
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
  const href = rest.disabled ? "" : url;
  return (
    <StyledLink href={href} {...props}>
      {children}
    </StyledLink>
  );
};

const StyledLink = styled(NextLink)<StyledProps>`
  ${(p) =>
    applyButtonStyles({
      size: p.size,
      disabled: p.disabled,
      $inverted: p.$inverted,
    })}
`;

export default ButtonLink;
