import React from 'react'

const DefaultLayout: React.FC = ({ children }) => (
  <div>
    <h1>Default layout</h1>

    <div>{children}</div>
  </div>
)
export default DefaultLayout
