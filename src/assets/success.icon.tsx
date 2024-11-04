import { SVGProps } from 'react';

export const SuccessIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="92"
      height="92"
      viewBox="0 0 92 92"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="5" y="5" width="82" height="82" rx="41" fill="#0DAC5C" />
      <rect x="5" y="5" width="82" height="82" rx="41" stroke="#C4F3DB" stroke-width="10" />
      <path
        d="M41.1988 51.85L34.8988 45.55L32.7988 47.65L41.1988 56.0499L59.1988 38.05L57.0988 35.95L41.1988 51.85Z"
        fill="white"
      />
    </svg>
  );
};
