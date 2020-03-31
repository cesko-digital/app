import React from 'react'

interface Props {
  children: any
}

export default ({ children }: Props) => (
  <div>
    <h1>Default layout</h1>

    <div>{children}</div>
  </div>
)
