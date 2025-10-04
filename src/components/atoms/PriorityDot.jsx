import React from "react";
import { cn } from "@/utils/cn";

const PriorityDot = React.forwardRef(
  ({ className, priority, ...props }, ref) => {
    const colors = {
      high: "bg-error",
      medium: "bg-secondary",
      low: "bg-accent",
    };

    return (
      <span
        ref={ref}
        className={cn("w-2 h-2 rounded-full", colors[priority], className)}
        {...props}
      />
    );
  }
);

PriorityDot.displayName = "PriorityDot";

export default PriorityDot;