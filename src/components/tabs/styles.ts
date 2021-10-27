import styled from 'styled-components'

const BORDER_COLOR = '#e8e8e8'

export const TabsWrapper = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  position: relative;
  //desktop
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    border-bottom: solid 2px ${BORDER_COLOR};
    :before,
    :after {
      content: '';
      height: 2px;
      width: 20%;
      position: absolute;
      background-color: ${BORDER_COLOR};
      bottom: -2px;
    }
    :before {
      right: 100%;
    }
    :after {
      left: 100%;
    }
  }
  //smaller
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-wrap: wrap;
  }
`

interface TabItemProps {
  isActive: boolean
}

export const TabItem = styled.li<TabItemProps>`
  padding: 12px 44px 12px 24px;
  font-weight: ${(props) =>
    props.isActive ? props.theme.fontWeights.bold : 'inherit'};
  cursor: ${(props) => (props.isActive ? 'default' : 'pointer')};
  font-size: ${({ theme }) => theme.fontSizes.base}px;
  border-top: solid 2px ${BORDER_COLOR};
  border-left: solid 2px ${BORDER_COLOR};
  border-right: solid 2px ${BORDER_COLOR};
  //desktop
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    :not(:first-child) {
      margin-left: -2px;
    }
    border-bottom: ${(props) => props.isActive && 'solid 2px white'};
    z-index: 1;
    margin-bottom: ${(props) => props.isActive && '-2px'};
  }
  //smaller
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: 100%;
    :not(:last-child) {
      margin-bottom: -2px;
    }
    border-bottom: solid 2px ${BORDER_COLOR};
  }
`
