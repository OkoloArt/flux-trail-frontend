import { SVGProps } from 'react';

export const WarningIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M40.0006 21.6334L65.1006 65H14.9006L40.0006 21.6334ZM40.0006 8.33337L3.33398 71.6667H76.6673L40.0006 8.33337ZM43.334 55H36.6673V61.6667H43.334V55ZM43.334 35H36.6673V48.3334H43.334V35Z"
        fill="#F56630"
      />
    </svg>
  );
};
