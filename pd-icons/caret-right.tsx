import React from "react";

const CaretRight = ({color = "#EBECEB" , ...props}) => {
  return (
    <svg
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.75 0.750061C0.75 0.750061 5.75 4.43256 5.75 5.75006C5.75 7.06756 0.75 10.7501 0.75 10.7501"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CaretRight;
