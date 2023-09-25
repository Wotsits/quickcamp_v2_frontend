import React from "react";

type AwningProps = {
  /** optional, class name */
  className?: string;
};

const Awning = ({ className }: AwningProps) => {
  return (
    <svg
      className={className && className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
      <path d="M269.4 6C280.5-2 295.5-2 306.6 6l224 160c7.4 5.3 12.2 13.5 13.2 22.5l32 288c1 9-1.9 18.1-8 24.9s-14.7 10.7-23.8 10.7H416L288 288V512H32c-9.1 0-17.8-3.9-23.8-10.7s-9-15.8-8-24.9l32-288c1-9 5.8-17.2 13.2-22.5L269.4 6z"/>    </svg>
  );
};

export default Awning;