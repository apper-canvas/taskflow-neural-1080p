import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import TaskInput from "@/components/molecules/TaskInput";
import FilterButtons from "@/components/molecules/FilterButtons";
import TaskList from "@/components/organisms/TaskList";
import CompletedSection from "@/components/organisms/CompletedSection";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { taskService } from "@/services/api/taskService";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [deletedTask, setDeletedTask] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (title) => {
    try {
      const newTask = await taskService.create({
        title,
        completed: false,
        priority: "medium",
        dueDate: null,
      });
      setTasks([newTask, ...tasks]);
      toast.success("Task added successfully!");
    } catch (err) {
      toast.error("Failed to add task");
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const updatedTask = await taskService.toggleComplete(id);
      setTasks(tasks.map((t) => (t.Id === id ? updatedTask : t)));
      toast.success(
        updatedTask.completed ? "Task completed! 🎉" : "Task reopened"
      );
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const taskToDelete = tasks.find((t) => t.Id === id);
      setDeletedTask(taskToDelete);
      setTasks(tasks.filter((t) => t.Id !== id));

      toast.info(
        <div className="flex items-center justify-between gap-4">
          <span>Task deleted</span>
          <button
            onClick={() => handleUndoDelete(taskToDelete)}
            className="text-white font-medium underline hover:no-underline"
          >
            Undo
          </button>
        </div>,
        {
          autoClose: 5000,
          closeButton: false,
        }
      );

      setTimeout(() => {
        taskService.delete(id);
      }, 5000);
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const handleUndoDelete = (task) => {
    setTasks([task, ...tasks]);
    setDeletedTask(null);
    toast.dismiss();
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates);
      setTasks(tasks.map((t) => (t.Id === id ? updatedTask : t)));
      toast.success("Task updated!");
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const getFilteredTasks = (completed) => {
    let filtered = tasks.filter((t) => t.completed === completed);

    if (activeFilter !== "all") {
      filtered = filtered.filter((t) => t.priority === activeFilter);
    }

    return filtered;
  };

  const activeTasks = getFilteredTasks(false);
  const completedTasks = getFilteredTasks(true);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTasks} />;

  return (
    <div className="min-h-screen bg-background">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />

      <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">TaskFlow</h1>
          <p className="text-gray-600">
            Your minimal task manager for maximum productivity
          </p>
        </motion.div>

        <div className="space-y-6">
          <TaskInput onAddTask={handleAddTask} />

          <FilterButtons
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />

          <TaskList
            tasks={activeTasks}
            onToggle={handleToggleComplete}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
            emptyMessage={
              activeFilter === "all"
                ? "No active tasks"
                : `No ${activeFilter} priority tasks`
            }
          />

          <CompletedSection
            tasks={completedTasks}
            onToggle={handleToggleComplete}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskManager;