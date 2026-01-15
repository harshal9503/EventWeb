import React, { useState } from "react";
import { motion } from "framer-motion";
import Loader from "./Loader";

const Button = ({
  children,
  onClick,
  variant = "primary",
  isLoading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline:
      "px-6 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-all duration-300",
  };

  const handleClick = (e) => {
    if (onClick && !isLoading && !disabled) {
      onClick(e);
    }
  };

  return (
    <motion.button
      className={`${variants[variant]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleClick}
      disabled={disabled || isLoading}
      whileTap={{ scale: 0.95 }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      animate={isPressed ? { scale: 0.95 } : { scale: 1 }}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2">
          <Loader size="small" text="" />
          <span>Processing...</span>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
