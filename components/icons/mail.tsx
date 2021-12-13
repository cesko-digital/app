import * as React from "react";

const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={72}
      height={72}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M52.333 1H19.667A4.667 4.667 0 0015 5.667V29a4.667 4.667 0 004.667 4.667h32.666A4.667 4.667 0 0057 29V5.667A4.667 4.667 0 0052.333 1z"
        stroke="#FFF6A3"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 5.667l21 11.666L57 5.667M57 8l14-7c0 25.667-14 23.333-14 23.333M15 8L1 1c0 25.667 14 23.333 14 23.333M36 47.666V71M47.667 43v14M24.333 43v14"
        stroke="#FFF6A3"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MailIcon;
