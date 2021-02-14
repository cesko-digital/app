import * as React from 'react'

const Arrow: React.FC<React.SVGProps<SVGSVGElement>> = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.1243 0H6.99924V1.75002H11.0243L5.51172 7.26259L6.73673 8.4876L12.2493 2.97504V7.00009H13.9993V0.875011C13.9993 0.350004 13.6493 0 13.1243 0Z"
        fill="white"
      />
      <path
        d="M12.2501 14.0002H0.875011C0.350004 14.0002 0 13.6502 0 13.1251V1.75001C0 1.225 0.350004 0.875 0.875011 0.875H4.37505V2.62502H1.75002V12.2501H11.3751V9.62511H13.1252V13.1251C13.1252 13.6502 12.7752 14.0002 12.2501 14.0002Z"
        fill="white"
      />
    </svg>
  )
}
export default Arrow
