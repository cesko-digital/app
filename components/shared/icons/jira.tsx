const Jira: React.FC<React.SVGProps<SVGSVGElement>> = () => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Path"
        fill="#2684ff"
        stroke="none"
        d="M 23.706181 11.808544 L 12.900681 1.178635 L 11.853651 0.148619 L 3.71954 8.150549 L -0 11.808544 C -0.386779 12.190998 -0.386779 12.809002 -0 13.191456 L 7.431232 20.50193 L 11.853651 24.851383 L 19.986641 16.849451 L 20.113316 16.725937 L 23.706181 13.196972 C 23.894234 13.013324 24 12.763432 24 12.502758 C 24 12.242083 23.894234 11.99219 23.706181 11.808544 Z M 11.853651 16.152481 L 8.140837 12.5 L 11.853651 8.847519 L 15.565343 12.5 Z"
      />
      <linearGradient
        id="linearGradient1"
        x1="11.188886"
        y1="5.15203"
        x2="6.004176"
        y2="10.251387"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.18" stopColor="#0052cc" stopOpacity="1" />
        <stop offset="1" stopColor="#2684ff" stopOpacity="1" />
      </linearGradient>
      <path
        id="path1"
        fill="url(#linearGradient1)"
        stroke="none"
        d="M 11.853651 8.847519 C 9.422859 6.456776 9.410839 2.583694 11.826745 0.178394 L 3.702724 8.167091 L 8.124022 12.516541 Z"
      />
      <linearGradient
        id="linearGradient2"
        x1="12.562134"
        y1="19.803858"
        x2="17.736756"
        y2="14.714426"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.18" stopColor="#0052cc" stopOpacity="1" />
        <stop offset="1" stopColor="#2684ff" stopOpacity="1" />
      </linearGradient>
      <path
        id="path2"
        fill="url(#linearGradient2)"
        stroke="none"
        d="M 15.575433 12.490076 L 11.853651 16.152481 C 14.294378 18.554197 14.294378 22.44746 11.853651 24.849176 L 20.000093 16.839527 Z"
      />
    </svg>
  );
};

export default Jira;
