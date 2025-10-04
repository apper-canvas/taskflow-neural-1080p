import tasksData from "../mockData/tasks.json";

const STORAGE_KEY = "taskflow_tasks";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getTasksFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksData));
  return [...tasksData];
};

const saveTasksToStorage = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const taskService = {
  getAll: async () => {
    await delay(100);
    return getTasksFromStorage();
  },

  getById: async (id) => {
    await delay(100);
    const tasks = getTasksFromStorage();
    return tasks.find((task) => task.Id === parseInt(id));
  },

  create: async (taskData) => {
    await delay(200);
    const tasks = getTasksFromStorage();
    const maxId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.Id)) : 0;
    const newTask = {
      Id: maxId + 1,
      ...taskData,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    const updatedTasks = [...tasks, newTask];
    saveTasksToStorage(updatedTasks);
    return newTask;
  },

  update: async (id, taskData) => {
    await delay(200);
    const tasks = getTasksFromStorage();
    const index = tasks.findIndex((task) => task.Id === parseInt(id));
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...taskData };
      saveTasksToStorage(tasks);
      return tasks[index];
    }
    throw new Error("Task not found");
  },

  delete: async (id) => {
    await delay(200);
    const tasks = getTasksFromStorage();
    const filteredTasks = tasks.filter((task) => task.Id !== parseInt(id));
    saveTasksToStorage(filteredTasks);
    return { success: true };
  },

  toggleComplete: async (id) => {
    await delay(200);
    const tasks = getTasksFromStorage();
    const index = tasks.findIndex((task) => task.Id === parseInt(id));
    if (index !== -1) {
      tasks[index].completed = !tasks[index].completed;
      tasks[index].completedAt = tasks[index].completed
        ? new Date().toISOString()
        : null;
      saveTasksToStorage(tasks);
      return tasks[index];
    }
    throw new Error("Task not found");
  },
};