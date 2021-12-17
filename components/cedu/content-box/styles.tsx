import styled from "styled-components";

export const BoxWrapper = styled.div`
  width: calc(100% - 48px);
  min-width: 376px;
  padding: 24px;
  margin: auto auto 24px;
  background-color: ${({ theme }) => theme.colors.pebble};
  border-radius: ${({ theme }) => theme.borderRadius.base}px;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-width: 0px;
  }
`;

export const TableOfContentCell = styled.a`
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: beige;
    cursor: pointer;
  }
`;

export const ResourceCell = styled.a`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &:hover {
    background-color: beige;
    cursor: pointer;
  }
`;

export const CreditsCell = styled.div`
  width: 100%;
  min-height: 60px;
  padding-bottom: 12px;
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
