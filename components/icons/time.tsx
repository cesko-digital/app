import * as React from "react";

const TimeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width={35}
      height={35}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M15,30A15,15,0,1,0,0,15,15,15,0,0,0,15,30ZM15,2A13,13,0,1,1,2,15,13,13,0,0,1,15,2Z" />
      <polygon points="14 16 21.16 16 21.16 14 16 14 16 7.43 14 7.43 14 15 14 15 14 16" />
    </svg>
  );
};

export default TimeIcon;
