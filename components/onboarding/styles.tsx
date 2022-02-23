import styled from "styled-components";
import { defaultTheme } from "components/theme/default";
import { SectionContent } from "components/layout";

const onboardingTheme = {
  fontSizes: {
    body: 20,
  },
  lineHeights: {
    body: 1.6,
  },
};

// basic typography components
export const H1 = styled.h1`
  margin: 0 0;
  font-size: ${({ theme }) => theme.fontSizes.xxl}px;
  font-weight: ${({ theme }) => theme.fontWeights.heading};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  color: ${({ theme }) => theme.colors.darkGrey};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.xxxl}px;
  }
`;

export const H4 = styled.h4`
  margin: 20px 0;
  font-size: ${({ theme }) => theme.fontSizes.md}px;
  font-weight: ${({ theme }) => theme.fontWeights.heading};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export const BodyBig = styled.p`
  font-size: ${onboardingTheme.fontSizes.body}px;
  line-height: ${({ theme }) => theme.lineHeights.heading};
  color: ${({ theme }) => theme.colors.asphalt};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 23px;
  }
`;
export interface BodyProps {
  color?: keyof typeof defaultTheme.colors;
}

export const Body = styled.p<BodyProps>`
  font-size: ${onboardingTheme.fontSizes.body}px;
  line-height: ${onboardingTheme.lineHeights.body};
  color: ${({ color = "asphalt", theme }) => theme.colors[color]};
`;

export const Highlighted = styled.span`
  background-color: ${({ theme }) => theme.colors.yellow};
  box-shadow: 0 4px 0 ${({ theme }) => theme.colors.yellow},
    0 -4px 0 ${({ theme }) => theme.colors.yellow};
`;

// onboarding page styles
export const SectionIntroductionContent = styled(SectionContent)`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding-top: ${({ theme }) => theme.space.lg}px;
    padding-bottom: ${({ theme }) => theme.space.lg}px;
    margin-top: 50px;
    background: url(/images/onboarding/bg-arrows.svg) calc(80% + 100px) 0%
        no-repeat,
      url(/images/onboarding/bg-arrows.svg) 80% calc(0% + 144px) no-repeat;
  }
`;

export const IntroductionHeader = styled.div`
  max-width: 768px;
`;

export const Spinner = styled.div<{ color?: string; background?: string }>`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  font-size: 10px;
  text-indent: -9999em;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme, color }) => color || theme.colors.darkGrey};
  background: conic-gradient(
    from 180deg at 50% 50%,
    ${({ theme, color }) => color || theme.colors.darkGrey} 0deg,
    rgba(71, 71, 91, 0) 360deg
  );
  animation: spinnerRotate 1.2s infinite linear;
  transform: translate(-50%, -50%);

  &:before {
    background: ${({ theme, background }) => background || theme.colors.white};
    width: 95%;
    height: 95%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @keyframes spinnerRotate {
    0% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }
`;
