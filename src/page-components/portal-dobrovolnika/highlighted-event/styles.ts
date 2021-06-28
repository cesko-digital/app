import styled from 'styled-components'
import {
  Body,
  bodyStyles,
  heading2Styles,
  Heading3,
} from 'components/typography'
import { Link } from '../../../components/links'

const AVATAR_SIZE = 82
const DESKTOP_CONTENT_RELATIVE_SIZE = 34
const MOBILE_CONTENT_RELATIVE_SIZE = 58

export const Container = styled.div`
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 0 -20px;
  }
`

export const Content = styled.div`
  padding: 100px;
  position: relative;
  background-image: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.it} ${DESKTOP_CONTENT_RELATIVE_SIZE}%,
    rgba(0, 0, 255, 0.5) 100%
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-radius: ${({ theme }) => theme.borderRadius.base}px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `48px 24px ${theme.space.xl}px`};
    background-image: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.it} ${MOBILE_CONTENT_RELATIVE_SIZE}%,
      rgba(0, 0, 255, 0.5) 100%
    );
  }
`

export const ProjectInfo = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`

export const ProjectImage = styled.div<{ src: string }>`
  width: ${100 - DESKTOP_CONTENT_RELATIVE_SIZE}%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center left;
  filter: grayscale(100%);

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    border-top-right-radius: ${({ theme }) => theme.borderRadius.base}px;
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius.base}px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: ${100 - MOBILE_CONTENT_RELATIVE_SIZE}%;
  }
`

export const Avatar = styled.div<{ src: string }>`
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
  border-radius: 50%;
  margin-bottom: 20px;
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-repeat: no-repeat;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: ${({ theme }) => theme.space.base}px;
  }
`

export const Name = styled(Heading3)`
  ${heading2Styles}
  color: ${({ theme }) => theme.colors.white};
  margin: 0 0 ${({ theme }) => theme.space.md}px;
`

export const Tagline = styled(Body)`
  color: ${({ theme }) => theme.colors.white};
  opacity: 0.8;
  margin: 0 0 19px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${bodyStyles}
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 376px;
  }
`

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const Tag = styled.div`
  padding: 0px 6px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.small}px;
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  line-height: ${({ theme }) => theme.lineHeights.body};
  color: ${({ theme }) => theme.colors.darkGrey};
  margin-bottom: 13px;

  &:not(:last-child) {
    margin-right: ${({ theme }) => theme.space.base}px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    color: ${({ theme }) => theme.colors.it};
    background: ${({ theme }) => theme.colors.violet};
  }
`

export const DetailLink = styled(Link)`
  color: white;

  margin-left: 30px;

  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0px;
    margin-top: 15px;
  }
`
