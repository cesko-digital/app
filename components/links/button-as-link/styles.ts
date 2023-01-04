import styled from "styled-components";
import Link from "next/link";
import {
  applyButtonStyles,
  StyledButtonProps,
} from "components/buttons/button/styles";

export const StyledLink = styled(Link)<StyledButtonProps>`
  ${(p) =>
    applyButtonStyles({
      size: p.size,
      disabled: p.disabled,
      $inverted: p.$inverted,
    })}
`;
