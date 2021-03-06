import React, { ReactNode } from 'react'
import styled from 'styled-components'

export interface SectionContentProps {
  horizontalPadding?: number
  verticalPadding?: number
  children: ReactNode
}

const Container = styled.div<SectionContentProps>`
  max-width: ${({ theme }) => theme.contentSize}px;
  padding: ${({ theme, verticalPadding = theme.space.outer }) =>
      verticalPadding}px
    ${({ theme, horizontalPadding = theme.space.outer }) => horizontalPadding}px;
  margin: auto;
`

const SectionContent: React.FC<SectionContentProps> = ({
  children,
  ...rest
}) => <Container {...rest}>{children}</Container>

export default SectionContent
