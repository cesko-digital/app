import styled from 'styled-components'

export const Container = styled.div`
  height: 16px;
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  width: 100%;
`

export const BaseBox = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  border-radius: 2px;
`

export const Background = styled(BaseBox)`
  background-color: ${({ theme }) => theme.colors.mediumGray};
  width: 100%;
`

export const Progress = styled(BaseBox)<{ percent: number }>`
  background-color: ${({ theme }) => theme.colors.it};
  transform: translateX(${({ percent }) => percent - 100}%);
  width: 100%;
  transition: transform 3s ease-in-out;
`
