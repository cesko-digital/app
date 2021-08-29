import styled from 'styled-components'
import { Heading3, heading4Styles } from 'components/typography'

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  min-height: 454px;
  background-color: white;

  border-radius: ${({ theme }) => theme.borderRadius.base}px;
  border: 2px solid ${({ theme }) => theme.colors.lightGray};
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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: ${({ theme }) => theme.space.lg}px;
`

export const Title = styled(Heading3)`
  ${heading4Styles}
  margin-bottom: 9px;
`

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base}px;
  flex-grow: 1;
`
