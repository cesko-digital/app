import React, { ReactNode } from "react";
import styled, { DefaultTheme } from "styled-components";

export interface SectionProps {
  children: ReactNode;
  backgroundColor?: string;
  as?: string;
  id?: string;
}

interface StyledProps extends SectionProps {
  theme: DefaultTheme;
}

const Container = styled.section<StyledProps>`
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.colors.white};
`;

const Section: React.FC<SectionProps> = ({
  children,
  as,
  ...rest
}: SectionProps) => {
  // As needs to be casted as undefined due wrong type definition
  return (
    <Container as={as as undefined} {...rest}>
      {children}
    </Container>
  );
};

export default Section;
