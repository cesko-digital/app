import styled from "styled-components";

export const GalleryImageItem = styled.img<{
  position: number;
  colStart: number;
  colEnd: number;
  rowStart: number;
  rowEnd: number;
}>`
  border-radius: ${({ theme }) => theme.borderRadius.base}px;
  width: 100%;
  height: 100%;
  max-height: 376px;
  align-self: center;
  object-fit: cover;
  ${(positions) => positions.position > 4 && "display: none;"}
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    ${(positions) => positions.position > 0 && "display: block;"}
    grid-column-start: ${(positions) => positions.colStart};
    grid-column-end: ${(positions) => positions.colEnd};
    grid-row-start: ${(positions) => positions.rowStart};
    grid-row-end: ${(positions) => positions.rowEnd};
  }
`;
