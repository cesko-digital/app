import { Body } from "components/typography";
import styled from "styled-components";

export const Wrapper = styled.div`
  > ${Body} {
    margin-top: 12px;
  }
`;

export const Description = styled(Body)`
  margin-bottom: 72px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 48px;
  }
`;
