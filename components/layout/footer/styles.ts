import { StyledLink } from "components/shared/link/styles";
import { Heading2, heading4Styles } from "components/typography";
import styled from "styled-components";

export const Wrapper = styled.footer`
  display: flex;
  flex: 1;
  overflow: auto;
  background-color: ${({ theme }) => theme.colors.darkGrey};
`;

export const Outer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space.xl}px ${({ theme }) => theme.space.md}px
    0 ${({ theme }) => theme.space.md}px;
  max-width: ${({ theme }) => theme.contentSize}px;
  box-sizing: content-box;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.space.none}px;
  }
`;

export const Container = styled.section`
  box-sizing: border-box;
  flex: 0;
  margin: ${({ theme }) => theme.space.base}px auto 0 0;
  width: 100%;
  max-width: calc(100% - 76px);
  color: ${({ theme }) => theme.colors.white};
  padding-bottom: ${({ theme }) => theme.space.lg}px;

  background-image: url("/images/czechia-map-arrows.png");
  background-repeat: no-repeat;
  background-position: left ${({ theme }) => theme.space.md}px bottom -${({ theme }) => theme.space.lg}px;
  background-size: 608px 336px;

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    background-image: url("/images/czechia-map-arrows@2x.png");
  }

  display: grid;
  grid-gap: ${({ theme }) => theme.space.lg}px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 460px;
  grid-template-areas:
    "info newsletter"
    "info note";

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.space.md * 1.5}px;
    max-width: 100%;

    background-position: bottom ${({ theme }) => theme.space.xl}px right -${({ theme }) => theme.space.xl}px;

    grid-template-rows: auto;
    grid-template-columns: auto;
    grid-template-areas: "newsletter" "info" "note";
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    background-position: bottom -285px left -120px;
    margin-bottom: 0;
    padding-bottom: ${({ theme }) => theme.space.lg * 2}px;
  }
`;

export const Info = styled.section`
  grid-area: info;
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.space.md}px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    justify-content: space-between;
  }
`;

export const InfoBlock = styled.div`
  flex: 1;
  & + & {
    margin-left: ${({ theme }) => theme.space.lg}px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex: 0;
    & + & {
      margin-left: ${({ theme }) => theme.space.md}px;
    }
    &:first-child {
      flex: 1;
    }
  }
`;

export const Heading = styled(Heading2)`
  ${heading4Styles}
  margin-bottom: ${({ theme }) => theme.space.lg}px;
  color: ${({ theme }) => theme.colors.white};
`;

export const Note = styled.section`
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  grid-area: note;
  line-height: ${({ theme }) => theme.lineHeights.body};
  opacity: 0.5;
`;

export const Navigation = styled.nav``;

export const Links = styled.ul`
  display: block;

  margin: 0;
  padding: 0;
  list-style-type: none;

  > * {
    flex: 0;
  }
`;

export const LinkItem = styled.li`
  padding: 0;
  margin: 0;

  & + & {
    margin-top: ${({ theme }) => theme.space.md}px;
  }

  > ${StyledLink} {
    color: ${({ theme }) => theme.colors.white};
  }
`;
