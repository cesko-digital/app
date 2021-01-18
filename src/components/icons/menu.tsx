import * as React from 'react'

const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 12h18M3 6h18M3 18h18"
        stroke="#00F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default MenuIcon
