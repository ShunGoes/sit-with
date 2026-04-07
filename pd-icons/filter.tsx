const FilterIcon = ({ color = "#667085", ...props }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.54704 12.7133C9.54704 13.12 9.28035 13.6533 8.94035 13.86L8.00037 14.4667C7.12703 15.0067 5.9137 14.4 5.9137 13.32V9.75334C5.9137 9.28001 5.64703 8.67335 5.3737 8.34001L2.81368 5.64667C2.47368 5.30667 2.20703 4.70668 2.20703 4.30001V2.75334C2.20703 1.94668 2.81371 1.34001 3.55371 1.34001H12.447C13.187 1.34001 13.7937 1.94667 13.7937 2.68667V4.16667C13.7937 4.70667 13.4537 5.38001 13.1204 5.71334"
        stroke={color}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.7134 11.0133C11.8916 11.0133 12.8468 10.0582 12.8468 8.88C12.8468 7.70179 11.8916 6.74666 10.7134 6.74666C9.53521 6.74666 8.58008 7.70179 8.58008 8.88C8.58008 10.0582 9.53521 11.0133 10.7134 11.0133Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.2467 11.4133L12.5801 10.7467"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FilterIcon;
