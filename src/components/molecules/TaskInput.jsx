import { useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TaskInput = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask(taskTitle.trim());
      setTaskTitle("");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-6 shadow-card"
    >
      <div className="flex gap-3">
        <Input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="What needs to be done?"
          autoFocus
          className="flex-1"
        />
        {(isFocused || taskTitle) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Button type="submit" disabled={!taskTitle.trim()}>
              <ApperIcon name="Plus" size={18} />
              Add
            </Button>
          </motion.div>
        )}
      </div>
    </motion.form>
  );
};

export default TaskInput;