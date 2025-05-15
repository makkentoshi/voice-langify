import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "outline" | "text";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-semibold rounded-full transition-all duration-200 focus:outline-none flex items-center justify-center";

  const variantClasses = {
    primary: "bg-primary-500 text-white active:bg-primary-600",
    secondary: "bg-gray-200 text-gray-800 active:bg-gray-300",
    outline: "border border-primary-500 text-primary-500 active:bg-primary-50",
    text: "text-primary-500 hover:bg-primary-50 active:bg-primary-100",
  };

  const sizeClasses = {
    sm: "text-sm py-2 px-4",
    md: "text-base py-3 px-6",
    lg: "text-lg py-4 px-8",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </motion.button>
  );
};

export default Button;
