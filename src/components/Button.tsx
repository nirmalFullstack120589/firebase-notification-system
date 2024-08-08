import React from "react";
import Loader from "./Loader";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  loader?: boolean;
  loaderClass?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
  loader = false,
  loaderClass = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`inline-flex items-center px-4 py-2 font-bold text-white transition-colors duration-300 rounded-lg disabled:cursor-not-allowed ${className}`}
      disabled={disabled || loader}
    >
      <div className="flex items-center justify-center gap-2">
        {loader && <Loader className={loaderClass} />}
        {children}
      </div>
    </button>
  );
};

export default Button;
