import styled, { css } from "styled-components";
import { defaultTheme as theme } from "components/theme/default";
import { default as NextLink } from "next/link";

export interface LinkStyle {
  variant?: "normal" | "smallDark" | "smallLight";
}

export interface LinkProps extends LinkStyle {
  to: string;
  children: React.ReactNode;
  openInNewTab?: boolean;
  className?: string;
}

const Link = ({
  children,
  variant = "normal",
  openInNewTab = false,
  to: url,
  ...rest
}: LinkProps) => {
  const props = { variant, ...rest };
  return openInNewTab ? (
    <StyledLink target="_blank" href={url} {...props}>
      {children}
    </StyledLink>
  ) : (
    <StyledLink href={url} {...props}>
      {children}
    </StyledLink>
  );
};

//
// Styles
//

const StyledLink = styled(NextLink)<LinkStyle>(({ variant = "normal" }) => {
  switch (variant) {
    case "normal":
      return normalLinkStyles;
    case "smallDark":
      return smallDarkLinkStyles;
    case "smallLight":
      return smallLightStyles;
  }
});

const baseLinkStyles = css`
  position: relative;
  display: inline-flex;
  width: max-content;
  align-items: center;

  border: none;
  outline: none;
  text-decoration: none;
  background: none;
  padding: 0;
  border-radius: 0;
  cursor: pointer;
`;

const normalLinkStyles = css`
  ${baseLinkStyles}

  font-weight: ${theme.fontWeights.button};
  font-size: ${theme.fontSizes.base}px;

  border-bottom: 2px solid;
  border-color: ${theme.colors.lightViolet};

  &:hover,
  &:focus {
    border-color: ${theme.colors.purple};
  }
`;

const smallDarkLinkStyles = css`
  ${baseLinkStyles}

  color: ${theme.colors.darkGrey};

  font-weight: 500;
  font-size: ${theme.fontSizes.small}px;

  border: none;
  text-decoration: underline;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

const smallLightStyles = css`
  ${smallDarkLinkStyles}
  color: white;
`;

export default Link;
