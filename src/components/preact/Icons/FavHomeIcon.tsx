

function FavHomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M19.07 4.93C17.22 3 14.66 1.96 12 2c-2.66-.04-5.21 1-7.06 2.93C3 6.78 1.96 9.34 2 12c-.04 2.66 1 5.21 2.93 7.06C6.78 21 9.34 22.04 12 22c2.66.04 5.21-1 7.06-2.93C21 17.22 22.04 14.66 22 12c.04-2.66-1-5.22-2.93-7.07M17 12v6h-3.5v-5h-3v5H7v-6H5l7-7 7.5 7H17z" />
    </svg>
  );
}

export default FavHomeIcon;
