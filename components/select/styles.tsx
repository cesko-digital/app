import styled from "styled-components";
import Select from "react-select";

export const StyledSelect = styled(Select)`
  line-height: 1.3;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.base}px;
  font-weight: 600;
`;
