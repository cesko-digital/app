import styled from 'styled-components'
import { Body } from 'components/typography'
import Link from 'components/links/link'

export const Wrapper = styled.div`
  > ${Body} {
    margin-top: 10px;
  }
`

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
  }
`

export const Description = styled(Body)`
  margin: 6px 0 24px;
  display: flex;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 10px 0 20px;
  }
`

export const Note = styled.span`
  color: ${({ theme }) => theme.colors.asphalt};
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  text-align: center;
  line-height: 22px;
  display: flex;
  flex-wrap: wrap;
  width: 277px;
  margin: 10px 0;
`

export const LinkHome = styled(Link)`
  color: ${({ theme }) => theme.colors.asphalt};
  font-size: ${({ theme }) => theme.fontSizes.small}px;
`

export const SlackLink = styled.div`
  display: flex;
  margin-right: 32px;
  > a {
    width: 100%;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-rignt: 0;
  }
`
