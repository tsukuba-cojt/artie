import React from "react";

type SvgProps = {
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
};

const SearchAreaFrameSVG: React.FC<SvgProps> = ({
  width = 200,
  height = 200,
  stroke = "#D74B4E",
  strokeWidth = 5,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 左上の角 */}
      <path
        d={`M ${strokeWidth / 2},${20} 
            L ${strokeWidth / 2},${strokeWidth / 2} 
            L ${20},${strokeWidth / 2}`}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* 右上の角 */}
      <path
        d={`M ${width - 20},${strokeWidth / 2} 
            L ${width - strokeWidth / 2},${strokeWidth / 2} 
            L ${width - strokeWidth / 2},${20}`}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* 左下の角 */}
      <path
        d={`M ${strokeWidth / 2},${height - 20} 
            L ${strokeWidth / 2},${height - strokeWidth / 2} 
            L ${20},${height - strokeWidth / 2}`}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* 右下の角 */}
      <path
        d={`M ${width - 20},${height - strokeWidth / 2} 
            L ${width - strokeWidth / 2},${height - strokeWidth / 2} 
            L ${width - strokeWidth / 2},${height - 20}`}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SearchAreaFrameSVG;
