import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const Picture = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100%;
`

export const PicturePlaceholder = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.lightGray};
`

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.darkGrey};
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  font-weight: ${({ theme }) => theme.fontWeights.button};
  margin-top: 12px;
  text-align: center;
`

export const SubTitle = styled.div`
  color: ${({ theme }) => theme.colors.darkGrey};
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  text-align: center;
`
