import styled from "styled-components";
import { StyledLinkProps } from "components/links/link";
import { applyLinkStyles } from "components/links/link/styles";
import { ButtonSize } from "components/buttons";

/**
 * The component is used where we need to have
 * a Link which behaves AS a Button
 */

const StyledLink = styled.button<StyledLinkProps>`
  ${(p) => applyLinkStyles({ size: p.size, disabled: p.disabled })}
`;

export interface LinkAsButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Partial<StyledLinkProps> {
  children: React.ReactNode;
}

const LinkAsButton: React.FC<LinkAsButtonProps> = ({
  children,
  size = ButtonSize.Normal,
  ...rest
}: LinkAsButtonProps) => (
  <StyledLink size={size} {...rest}>
    {children}
  </StyledLink>
);

export default LinkAsButton;
