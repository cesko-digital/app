import React from "react";
import styled from "styled-components";
import Checkbox from "components/onboarding/form/checkbox";

export const TreeList = styled.ul`
  margin: 0 0 42px;
  padding: 0;
  list-style-type: none;
`;

export const TreeListItem = styled.li`
  position: relative;
  border-bottom: 2px solid #cbcbcf;
`;

export const ToggleLabel = styled.label`
  display: flex;
  padding: 13px 40px;
  position: relative;
  font-size: ${({ theme }) => theme.fontSizes.base}px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.button};
  cursor: pointer;
`;

// display property is controlled in the component
export const ToggleContent = styled.div`
  display: none;
  max-height: 0;
  opacity: 0;
  overflow-y: auto;
  transition: 0.2s all ease-out;
`;

export const ToggleContentContainer = styled.div`
  padding-left: 40px;
  padding-bottom: 20px;
`;

export const ToggleInput = styled.input`
  position: absolute;
  left: 0;
  width: 100%;
  height: 49px;
  margin: 0;
  border: 0;
  opacity: 0.01;

  & + ${ToggleLabel} svg {
    fill: ${({ theme }) => theme.colors.gravel};
    position: absolute;
    top: 18px;
    left: 8px;
    transition: 0.2s all ease-out;
  }

  &:checked + ${ToggleLabel} + ${ToggleContent} {
    max-height: 1000px;
    overflow-y: auto;
    opacity: 1;
  }

  &:checked + ${ToggleLabel} svg {
    transform: rotate(90deg);
  }
`;

export const SkillCheckbox = styled(Checkbox)<{ separated?: boolean }>`
  margin-top: 8px;
  margin-bottom: 0;

  ${({ separated }) =>
    separated &&
    `
    margin: 0;
    padding: 15px 0;
    border-top: 2px solid rgba(169, 169, 177, 0.2);
  `}
`;

export const SkillsList = styled.div`
  margin-bottom: 20px;
`;

export const SkillsListItem = styled.div``;

export const ToggleIcon = () => (
  <svg
    width="8"
    height="16"
    viewBox="0 0 8 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7.29289 6.29289C7.68342 6.68342 7.68342 7.31658 7.29289 7.70711L1.7071 13.2929C1.07714 13.9229 0 13.4767 0 12.5858L0 1.41421C0 0.523308 1.07714 0.0771421 1.70711 0.707107L7.29289 6.29289Z" />
  </svg>
);

export const SelectedCountLabel = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  line-height: ${({ theme }) => theme.lineHeights.button};
  pointer-events: none;
  padding: 8px 0 40px 13px;
  font-size: 13px;
  text-align: right;
  max-width: 30%;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: none;
    padding: 13px 40px;
    font-size: ${({ theme }) => theme.fontSizes.base}px;
  }
`;
