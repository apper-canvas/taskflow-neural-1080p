import { useState } from "react";
import { motion } from "framer-motion";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import PriorityDot from "@/components/atoms/PriorityDot";
import DateBadge from "@/components/molecules/DateBadge";
import TaskEditModal from "@/components/molecules/TaskEditModal";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskCard = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updates) => {
    onUpdate(task.Id, updates);
    setIsEditing(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
        className={cn(
          "bg-white rounded-xl p-6 shadow-card transition-all duration-300",
          task.completed && "opacity-60"
        )}
      >
        <div className="flex items-start gap-4">
          <Checkbox
            checked={task.completed}
            onChange={() => onToggle(task.Id)}
          />

          <div
            className="flex-1 cursor-pointer"
            onClick={() => !task.completed && setIsEditing(true)}
          >
            <div className="flex items-start gap-3 mb-3">
              <PriorityDot priority={task.priority} className="mt-1.5" />
              <motion.h3
                className={cn(
                  "text-base font-medium text-gray-900 flex-1",
                  task.completed && "line-through text-gray-500"
                )}
                animate={task.completed ? { opacity: 0.6 } : { opacity: 1 }}
              >
                {task.title}
              </motion.h3>
            </div>

            {task.dueDate && (
              <div className="flex items-center gap-3 ml-5">
                <DateBadge date={task.dueDate} />
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.Id)}
            className="p-2 hover:bg-red-50 hover:text-error"
          >
            <ApperIcon name="Trash2" size={18} />
          </Button>
        </div>
      </motion.div>

      {isEditing && (
        <TaskEditModal
          task={task}
          onSave={handleSave}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
};

export default TaskCard;