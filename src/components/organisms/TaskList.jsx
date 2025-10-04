import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/organisms/TaskCard";
import Empty from "@/components/ui/Empty";

const TaskList = ({ tasks, onToggle, onDelete, onUpdate, emptyMessage }) => {
  if (tasks.length === 0) {
    return <Empty message={emptyMessage} />;
  }

  return (
    <motion.div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskCard
            key={task.Id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;