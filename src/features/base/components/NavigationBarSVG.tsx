import React from "react";
type SvgProps = {
  width?: string | number;
  height?: string | number;
  fill?: string;
};
const NavigationBarSVG: React.FC<SvgProps> = ({
  width = 393,
  height = 107,
  fill = "#D74B4E",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 393 107"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M149.182 32C156.319 32 162.058 26.422 165.228 20.0282C171.113 8.15917 183.354 0 197.5 0C211.646 0 223.887 8.15917 229.772 20.0282C232.942 26.422 238.681 32 245.818 32H387.5C390.814 32 393.5 34.6863 393.5 38V81C393.5 95.3594 381.859 107 367.5 107H26.5C12.1406 107 0.5 95.3594 0.5 81V38C0.5 34.6863 3.18629 32 6.5 32H149.182Z"
        fill={fill}
      />
    </svg>
  );
};
export default NavigationBarSVG;
