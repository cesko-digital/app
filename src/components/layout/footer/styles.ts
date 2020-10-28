import { Link } from 'components/links/link/styles'
import styled from 'styled-components'
import czechiaMapArrows from 'images/czechia-map-arrows.png'
import czechiaMapArrows2x from 'images/czechia-map-arrows@2x.png'

export const Wrapper = styled.footer`
  display: flex;
  flex: 1;
  overflow: auto;
  background-color: ${(props) => props.theme.colors.darkGrey};
`

export const Outer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 auto;
  padding: ${(props) => props.theme.space.xl}px
    ${(props) => props.theme.space.md}px 0 ${(props) => props.theme.space.md}px;
  max-width: ${(props) => props.theme.contentSize}px;
  box-sizing: content-box;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    padding: ${(props) => props.theme.space.none}px;
  }
`

export const Container = styled.section`
  box-sizing: border-box;
  flex: 0;
  margin: ${(props) => props.theme.space.base}px auto 0 0;
  width: 100%;
  max-width: calc(100% - 76px);
  color: ${(props) => props.theme.colors.white};
  padding-bottom: ${(props) => props.theme.space.lg}px;

  background-image: url('${czechiaMapArrows}');
  background-repeat: no-repeat;
  background-position: left ${(props) => props.theme.space.md}px bottom -${(
  props
) => props.theme.space.lg}px;
  background-size: 608px 336px;

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    background-image: url('${czechiaMapArrows2x}');
  }

  display: grid;
  grid-gap: ${(props) => props.theme.space.lg}px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 460px;
  grid-template-areas:
    'info newsletter'
    'info note';

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    padding: ${(props) => props.theme.space.md * 1.5}px;
    max-width: 100%;

    background-position: bottom 
      ${(props) => props.theme.space.xl}px
      right
      -${(props) => props.theme.space.xl}px;

    grid-template-rows: auto;
    grid-template-columns: auto;
    grid-template-areas: 'newsletter' 'info' 'note';
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    background-position: bottom -285px left -120px;
    margin-bottom: 0;
    padding-bottom: ${(props) => props.theme.space.lg * 2}px;
  }
`

export const Info = styled.section`
  grid-area: info;
  display: flex;

  @media (max-width: ${(props) => props.theme.breakpoints.md}) {
    margin-bottom: ${(props) => props.theme.space.md}px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    justify-content: space-between;
  }
`

export const InfoBlock = styled.div`
  flex: 1;
  & + & {
    margin-left: ${(props) => props.theme.space.lg}px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex: 0;
    & + & {
      margin-left: ${(props) => props.theme.space.md}px;
    }
    &:first-child {
      flex: 1;
    }
  }
`

export const Heading = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.md}px;
  line-height: ${(props) => props.theme.lineHeights.heading};
  margin-bottom: ${(props) => props.theme.space.lg}px;
`

export const Note = styled.section`
  font-size: ${(props) => props.theme.fontSizes.small}px;
  grid-area: note;
  line-height: ${(props) => props.theme.lineHeights.body};
  opacity: 0.5;
`

export const Navigation = styled.nav``

export const Links = styled.ul`
  display: block;

  margin: 0;
  padding: 0;
  list-style-type: none;

  > * {
    flex: 0;
  }
`

export const LinkItem = styled.li`
  padding: 0;
  margin: 0;

  & + & {
    margin-top: ${(props) => props.theme.space.md}px;
  }

  > ${Link} {
    color: ${(props) => props.theme.colors.white};
  }
`
