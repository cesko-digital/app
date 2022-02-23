import styled from "styled-components";

export const InputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

export const InputLabel = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.base}px;
  font-weight: ${({ theme }) => theme.fontWeights.button};
  color: ${({ theme }) => theme.colors.asphalt};
  margin-bottom: ${({ theme }) => theme.space.base}px;
`;

export const StyledInput = styled.input<{ isValid?: boolean }>`
  margin: 4px 0;
  padding: 9px 16px 11px;
  border: 2px solid ${({ isValid }) => (isValid ? "#A9A9B1" : "#A82700")};
  border-radius: ${({ theme }) => theme.borderRadius.base}px;
  line-height: 1.6;
  outline: none;
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.darkGrey};

  &:focus {
    box-shadow: 0 0 0 4px
      ${({ isValid }) =>
        isValid ? "rgba(0, 39, 0, 0.1)" : "rgba(168, 39, 0, 0.1)"};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const ValidationMessage = styled.div`
  color: #a82700;
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  line-height: ${({ theme }) => theme.lineHeights.body};
`;
