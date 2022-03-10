import styled from "styled-components";
import {
  applyButtonStyles,
  StyledButtonProps,
} from "components/shared/buttons/button/styles";

export const StyledLink = styled.a<StyledButtonProps>`
  ${(p) =>
    applyButtonStyles({
      size: p.size,
      disabled: p.disabled,
      $inverted: p.$inverted,
    })}
`;
