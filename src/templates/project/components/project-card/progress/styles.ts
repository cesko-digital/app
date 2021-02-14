import styled from 'styled-components'

export const Title = styled.h2`
  margin: 0 0 20px;
  font-size: ${({ theme }) => theme.fontSizes.base}px;
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`

export const Text = styled.span`
  display: none;
  position: absolute;
  top: 0;
  right: 20px;
  z-index: 1;
  width: 274px;
  background-color: ${({ theme }) => theme.colors.stone};
  border-radius: 5px;
  padding: 10px;
  font-style: italic;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 200px;
  }
`

export const Tooltip = styled.div`
  display: flex;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  position: relative;
  cursor: pointer;
  z-index: 2;
  margin-bottom: 18px;
  &:hover ${Text} {
    display: block;
  }
`
