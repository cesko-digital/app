import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const DefaultLayout: React.FC<Props> = ({ children }: Props) => (
  <div>
    <h1>Default layout</h1>

    <div>{children}</div>
  </div>
)
export default DefaultLayout
