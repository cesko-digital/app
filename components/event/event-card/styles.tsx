import styled from "styled-components";

export const Container = styled.div`
  width: calc(100% - 64px);
  min-width: 250px;
  margin: auto;
  padding: 32px;
  background-color: ${({ theme }) => theme.colors.pebble};
  border-radius: ${({ theme }) => theme.borderRadius.base}px;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
`;
