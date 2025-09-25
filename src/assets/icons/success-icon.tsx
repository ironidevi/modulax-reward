import * as React from "react";
const SuccessIcon = (props: any) => (
  <svg
    width={68}
    height={68}
    viewBox="0 0 68 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={68} height={68} rx={34} fill="#212223" fillOpacity={0.2} />
    <rect x={11} y={11} width={46} height={46} rx={23} fill="#212223" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M41.8198 28.1953C42.0601 28.4556 42.0601 28.8777 41.8198 29.1381L31.9736 39.8047C31.7333 40.0651 31.3436 40.0651 31.1033 39.8047L26.1802 34.4714C25.9399 34.2111 25.9399 33.7889 26.1802 33.5286C26.4206 33.2682 26.8102 33.2682 27.0505 33.5286L31.5385 38.3905L40.9495 28.1953C41.1898 27.9349 41.5794 27.9349 41.8198 28.1953Z"
      fill="white"
    />
  </svg>
);
export default SuccessIcon;
