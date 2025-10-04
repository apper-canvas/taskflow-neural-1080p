import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[800px] mx-auto px-4 sm:px-6 py-16 text-center"
    >
      <div className="bg-white rounded-2xl p-12 shadow-card">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          {message || "We couldn't load your tasks. Please try again."}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all hover:-translate-y-0.5"
          >
            <ApperIcon name="RefreshCw" size={18} />
            Try Again
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;