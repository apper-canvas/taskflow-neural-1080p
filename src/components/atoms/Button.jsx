import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-primary text-white hover:bg-primary/90 hover:-translate-y-0.5 active:scale-[0.98]",
      secondary: "bg-secondary text-white hover:bg-secondary/90 hover:-translate-y-0.5 active:scale-[0.98]",
      ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:scale-[0.98]",
      danger: "bg-error text-white hover:bg-error/90 hover:-translate-y-0.5 active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;