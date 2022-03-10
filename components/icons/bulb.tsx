import React from "react";

const BulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => {
  return (
    <svg width={81} height={81} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M40.508 68.15V80"
        stroke="#9999FF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60.254 40.5a19.752 19.752 0 00-10.356-17.374 19.744 19.744 0 00-27.14 8.721 19.752 19.752 0 009.851 26.755v9.548h15.797V58.6A19.752 19.752 0 0060.254 40.5z"
        fill="#fff"
        stroke="#9999FF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40.508 1v7.9M68.432 12.57l-5.582 5.584M80 40.5h-7.898M8.898 40.5H1M12.585 12.57l5.581 5.584"
        stroke="#9999FF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BulbIcon;
