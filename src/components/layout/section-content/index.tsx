import React, { ReactNode } from 'react'
import styled from 'styled-components'

export interface SectionContentProps {
  horizontalPadding?: number
  verticalPadding?: number
  children: ReactNode
}

const Container = styled.div<SectionContentProps>`
  max-width: 1200px;
  padding: ${({ verticalPadding = 20 }) => verticalPadding}px ${({ horizontalPadding = 20 }) => horizontalPadding}px;
  margin: auto;
`

const SectionContent: React.FC<SectionContentProps> = ({ children, ...rest }) => <Container {...rest}>{children}</Container>

export default SectionContent
