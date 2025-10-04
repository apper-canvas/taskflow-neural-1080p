import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import PriorityDot from "@/components/atoms/PriorityDot";

const FilterButtons = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { value: "all", label: "All Tasks" },
    { value: "high", label: "High", priority: "high" },
    { value: "medium", label: "Medium", priority: "medium" },
    { value: "low", label: "Low", priority: "low" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="sticky top-0 z-10 bg-background py-4"
    >
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant={activeFilter === filter.value ? "primary" : "ghost"}
            size="sm"
            onClick={() => onFilterChange(filter.value)}
            className="flex items-center gap-2"
          >
            {filter.priority && <PriorityDot priority={filter.priority} />}
            {filter.label}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default FilterButtons;