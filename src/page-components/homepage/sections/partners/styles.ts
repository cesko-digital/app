import styled from 'styled-components'
import { Heading2 } from 'components/typography'

export const MainTitle = styled(Heading2)`
  margin: 0 0 65px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 40px;
  }
`

export const Wrapper = styled.div`
  margin: 0 0 150px;
`
