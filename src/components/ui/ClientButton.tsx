"use client";

import Loader from "../Loader";

const ClientButton = ({
  children,
  className,
  onClick,
  loading = false,
  ...props
}) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={`${className} ${loading && "min-w-[120px] min-h-[48px]"}`}
      {...props}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default ClientButton;
