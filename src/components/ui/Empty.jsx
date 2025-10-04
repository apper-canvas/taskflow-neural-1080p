import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ message, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full py-16 text-center"
    >
      <div className="max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="CheckCircle2" className="w-12 h-12 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {message || "No tasks yet!"}
        </h3>
        <p className="text-gray-600 mb-8">
          Add a task above to get started and stay organized.
        </p>
        {action && (
          <button
            onClick={action.onClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all hover:-translate-y-0.5"
          >
            <ApperIcon name="Plus" size={18} />
            {action.label}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;