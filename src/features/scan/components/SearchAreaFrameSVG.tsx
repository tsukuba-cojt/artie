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
  const cornerLength = 20; // 各コーナーの長さ

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 左上の角 */}
      <path
        d={`M ${strokeWidth / 2},${cornerLength} 
            L ${strokeWidth / 2},${strokeWidth / 2} 
            L ${cornerLength},${strokeWidth / 2}`}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* 右上の角 */}
      <path
        d={`M ${width - cornerLength},${strokeWidth / 2} 
            L ${width - strokeWidth / 2},${strokeWidth / 2} 
            L ${width - strokeWidth / 2},${cornerLength}`}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* 左下の角 */}
      <path
        d={`M ${strokeWidth / 2},${height - cornerLength} 
            L ${strokeWidth / 2},${height - strokeWidth / 2} 
            L ${cornerLength},${height - strokeWidth / 2}`}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* 右下の角 */}
      <path
        d={`M ${width - cornerLength},${height - strokeWidth / 2} 
            L ${width - strokeWidth / 2},${height - strokeWidth / 2} 
            L ${width - strokeWidth / 2},${height - cornerLength}`}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
};

export default SearchAreaFrameSVG;
