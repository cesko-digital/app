import React from 'react'

interface IProps {
  children: any
}

export default ({ children }: IProps) => (
  <div>
    <h1>Default layout</h1>

    <div>{children}</div>
  </div>
)
