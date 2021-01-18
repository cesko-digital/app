import * as React from 'react'

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        d="M18 6L6 18M6 6l12 12"
        stroke="#00F"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CloseIcon
