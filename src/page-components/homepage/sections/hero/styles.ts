import { Body } from 'components/typography'
import ButtonAsLink from 'components/links/button-as-link'
import styled, { css, CssWithTheme } from 'styled-components'
import { SectionContent } from 'components/layout'
import { CzechiaMapArrows } from 'components/illustrations'

export const ShiftedBody = styled(Body)`
  margin-top: 10px;
  margin-bottom: 32px;
  line-height: 32px
  color:  ${({ theme }) => theme.colors.asphalt} 
`

export const ShiftedButton = styled(ButtonAsLink)`
  margin-left: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0;
    margin-top: 10px;
    display: flex;
    width: max-content;
  }
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => `${theme.space.md}px ${theme.space.md}px`};
  height: 602px;
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    height: 530px;
  }
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 454px;
  background-color: white;
  overflow: hidden;
  position: relative;
`

export const Content = styled.div`
  margin-top: ${({ theme }) => theme.space.xxl}px;
  margin-bottom: ${({ theme }) => theme.space.xl}px;
  display: block;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-top: 0;
  }
`

export const HeroPersonTopCircleImage = styled.div`
  background-image: url('https://data.cesko.digital/web/sections/hero/top-circle.png');
  background-repeat: no-repeat;
  width: 82px;
  height: 82px;
  position: absolute;
  right: 0;
  top: 0;
  display: block;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

export interface CircleProps {
  color: string
}

export const applyCircleStyles = ({ color }: CircleProps): CssWithTheme => {
  return css`
    background: ${color};
    border-radius: 50%;
    width: 30px;
    height: 30px;
  `
}

export const Circle = styled.div<CircleProps>`
  ${({ color }) =>
    applyCircleStyles({
      color,
    })}
`

export const CircleLeft = styled.div`
  position: absolute;
  top: 160px;
  left: -74px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    top: -20px;
    left: 20px;
  }
`
export const CircleRight = styled.div`
  position: absolute;
  right: 0;
  bottom: 147px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

export const HeroPersonBottomCircleImage = styled.div`
  background-image: url('https://data.cesko.digital/web/sections/hero/bottom-circle.png');
  background-repeat: no-repeat;
  width: 200px;
  height: 200px;
  position: absolute;
  left: 50%;
  top: 460px;
  display: block;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

export const HeroTeamCircleImage = styled.div`
  background-image: url('https://data.cesko.digital/web/sections/hero/team-circle-image.png');
  background-repeat: no-repeat;
  width: 114px;
  height: 114px;
  position: absolute;
  left: 50%;
  top: 193px;
  display: block;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

export const CzechiaMap = styled(CzechiaMapArrows)`
  margin-top: 105px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

export const CzechiaMapMobile = styled(CzechiaMapArrows)`
  position: absolute;
  bottom: -80px;
  right: -500px;
  left: 50%;
  display: none;
  width: 700px;
  height: 400px;
  z-index: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
`

export const Section = styled(SectionContent)`
  position: relative;
`
