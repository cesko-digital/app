import styled from "styled-components";
import { defaultTheme } from "components/theme/default";
import { Props as CalloutProps } from "./";
import Octagon from "../images/x-octagon.svg";
import Check from "../images/check.svg";

const getCalloutToneColor = (type: CalloutProps["type"]) => {
  switch (type) {
    case "success":
      return "#006622";
    case "error":
      return "#A82700";
    default:
      return defaultTheme.colors.gravel;
  }
};

const getCalloutIcon = (type: CalloutProps["type"]) => {
  switch (type) {
    case "success":
      return Check;
    case "error":
      return Octagon;
    default:
      return null;
  }
};

export const CalloutBox = styled.div<{ type: CalloutProps["type"] }>`
  padding: 24px 80px 24px;
  border: 2px solid ${({ type }) => getCalloutToneColor(type)};
  border-radius: ${({ theme }) => theme.borderRadius.base}px;
  box-shadow: 0px 0px 0px 4px ${({ type }) => getCalloutToneColor(type)}1a;
  background-color: ${({ type }) => getCalloutToneColor(type)}1a;
  color: ${({ type }) => getCalloutToneColor(type)};
  font-size: 20px;
  line-height: 1.6;
  background-image: url(${({ type }) => getCalloutIcon(type)});
  background-repeat: no-repeat;
  background-position: top 22px left 22px;

  a {
    color: ${({ type }) => getCalloutToneColor(type)};
  }
`;
