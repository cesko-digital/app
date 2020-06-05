import * as React from 'react'

interface Props {
  children: string
}

// This will be imported from src/components, once components are created
const H1 = ({ children }: Props) => {
  return <h1>{children}</h1>
}

export const heading1 = () => <H1>Heading 1</H1>

export default {
  title: 'Headings',
}
