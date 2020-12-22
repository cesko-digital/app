import styled from 'styled-components'

export const OrderedList = styled.ol`
  margin: 0;
  padding: 0;
  font-size: ${({ theme }) => theme.fontSizes.small}px;
`

export const ListItem = styled.li`
  display: inline;
`

export const Separator = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.colors.gravel};
  margin: 0 10px;
`

export const Current = styled.span`
  color: ${({ theme }) => theme.colors.asphalt};
`
