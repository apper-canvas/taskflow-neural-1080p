import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = React.forwardRef(
  ({ className, checked, onChange, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={onChange}
        className={cn(
          "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 cursor-pointer",
          checked
            ? "bg-primary border-primary"
            : "bg-white border-gray-300 hover:border-primary",
          className
        )}
        {...props}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ApperIcon name="Check" size={14} className="text-white" />
          </motion.div>
        )}
      </button>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;