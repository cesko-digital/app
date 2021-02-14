import styled from 'styled-components'

export interface props {
  href: string
}

export const Container = styled.div`
  max-width: 1160px;
  display: flex;
  margin: 0 0 20px;
`

export const Logo = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 26px;
`

export const Link = styled.a.attrs((props) => ({
  href: props.href,
}))`
  font-weight: ${({ theme }) => theme.fontWeights.body};
  font-size: ${({ theme }) => theme.fontSizes.base}px;
  line-height: ${({ theme }) => theme.lineHeights.button};
  color: ${({ theme }) => theme.colors.darkGrey};
  padding-bottom: 3px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.stone};
  cursor: pointer;
  text-decoration: none;
`
