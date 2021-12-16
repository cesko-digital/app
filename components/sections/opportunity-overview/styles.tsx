import styled from 'styled-components'
import { heading4Styles } from 'components/typography'

export const Container = styled.div`
  max-width: ${({ theme }) => theme.contentSize}px;
  margin: 0 auto;
`

export const OpportunityWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 22px 0;
  border-bottom: 1px solid #f0f0f2;
  a {
    text-decoration: none;
  }
`

export const OpportunityHeading = styled.div`
  ${heading4Styles}
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkGrey};
`

export const OpportunityMetaWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 14px;
`

export const OpportunityRightWrapper = styled.div`
  display: flex;
  gap: 24px;
  text-align: right;
  a {
    text-decoration: none;
  }
`

export const OpportunityLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: gray;
`
