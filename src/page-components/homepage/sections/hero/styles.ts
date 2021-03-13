import { Body } from 'components/typography'
import ButtonAsLink from 'components/links/button-as-link'
import styled from 'styled-components'
import heroImg1 from 'images/hero-img-1.png'
import heroImg2 from 'images/hero-img-2.png'
import heroImg3 from 'images/hero-img-3.png'
import heroImg4 from 'images/hero-img-4.png'
import heroImg5 from 'images/hero-img-5.png'
import CzechiaMapArrows from 'images/czechia-map-arrows'
import { SectionContent } from 'components/layout'

export const ShiftedBody = styled(Body)`
  margin-top: 10px;
  margin-bottom: 32px;
`

export const ShiftedButton = styled(ButtonAsLink)`
  margin-left: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 0;
    margin-top: 10px;
    display: flex;
    width: intrinsic;
  }
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => `${theme.space.md}px ${theme.space.md}px`};

  height: 602px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    height: 530px;
  }

  position: relative;
  overflow: hidden;
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

export const image1 = styled.div`
  background-image: url('${heroImg1}');
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

export const image2 = styled.div`
  background-image: url('${heroImg2}');
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  position: absolute;
  top: calc(${({ theme }) => theme.space.xxl}px + 135px);
  left: 150px;

  @media (max-width: 1600px) {
    top: 80px;
    left: 20px;
  }
`

export const image3 = styled.div`
  background-image: url('${heroImg3}');
  background-repeat: no-repeat;
  width: 200px;
  height: 200px;
  position: absolute;
  left: 50%;
  top: 560px;
  z-index: 200;

  display: block;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`

export const image4 = styled.div`
  background-image: url('${heroImg4}');
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

export const image5 = styled.div`
  background-image: url('${heroImg5}');
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 0;
  bottom: 147px;

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
  bottom: 0;
  right: -400px;
  display: none;
  z-index: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
  }
`

export const Section = styled(SectionContent)`
  position: static;
`
