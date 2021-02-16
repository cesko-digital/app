import styled from 'styled-components'
import { Heading4 } from 'components/typography'

export const Card = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 454px;
  background-color: white;

  border-radius: ${({ theme }) => theme.borderRadius.base}px;
  border: 2px solid ${({ theme }) => theme.colors.pebble};
  overflow: hidden;
`

export const Header = styled.div`
  position: relative;
  height: 170px;
`

export const Cover = styled.div<{ url: string }>`
  position: absolute;
  width: 100%;
  height: 100%;

  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
`
Cover.defaultProps = {
  role: 'img',
}

export const Logo = styled.div<{ url: string }>`
  position: absolute;
  left: ${({ theme }) => theme.space.lg}px;
  bottom: -24px;

  width: 82px;
  height: 82px;

  background-color: ${({ theme }) => theme.colors.white};
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;

  border-radius: 50%;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(8, 8, 50, 0.12);
`
Logo.defaultProps = {
  role: 'img',
}

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: ${({ theme }) => theme.space.lg}px;
`

export const Title = styled(Heading4)`
  margin-bottom: 9px;
`

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  list-style: none;
  margin: 0;
  padding: 0;
`

export const Tag = styled.li`
  background-color: ${({ theme }) => theme.colors.pebble};
  border-radius: ${({ theme }) => theme.borderRadius.base / 2};

  font-size: ${({ theme }) => theme.fontSizes.small};

  margin-right: ${({ theme }) => theme.space.small}px;
  margin-bottom: ${({ theme }) => theme.space.small}px;
  padding: ${({ theme }) => theme.space.small}px;
`

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base}px;
  flex-grow: 1;
`
