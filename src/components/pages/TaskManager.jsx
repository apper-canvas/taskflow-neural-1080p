import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import { AuthContext } from "../../App";
import ApperIcon from "@/components/ApperIcon";
import TaskInput from "@/components/molecules/TaskInput";
import FilterButtons from "@/components/molecules/FilterButtons";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import CompletedSection from "@/components/organisms/CompletedSection";
import TaskList from "@/components/organisms/TaskList";
import Button from "@/components/atoms/Button";

const TaskManager = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
const { logout } = useContext(AuthContext);

  // Check authentication before any hooks to comply with Rules of Hooks
// All hooks must be called at the top, before any early returns
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [deletedTask, setDeletedTask] = useState(null);

  // Authentication redirect effect
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Load tasks effect
  useEffect(() => {
    loadTasks();
  }, []);

  // Early return AFTER all hooks
  if (!isAuthenticated) {
    return null;
  }

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


const handleAddTask = async (title_c) => {
    try {
      const newTask = await taskService.create({
        title_c,
        completed_c: false,
        priority_c: "medium",
        due_date_c: null,
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
        updatedTask.completed_c ? "Task completed! 🎉" : "Task reopened"
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
let filtered = tasks.filter((t) => t.completed_c === completed);

    if (activeFilter !== "all") {
      filtered = filtered.filter((t) => t.priority_c === activeFilter);
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
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">TaskFlow</h1>
              <p className="text-gray-600">
                Your minimal task manager for maximum productivity
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="flex items-center gap-2"
            >
              <ApperIcon name="LogOut" size={18} />
              Logout
            </Button>
          </div>
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