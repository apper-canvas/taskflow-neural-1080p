import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 py-8">
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-card"
          >
            <div className="flex items-start gap-4">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="flex items-center gap-3">
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-24" />
                  <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;