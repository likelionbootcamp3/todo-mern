import axios from "./axios";

export const getAllTasks = async () => {
  const res = await axios.get("/tasks");
  return res.data;
};

export const getTask = async (id) => {
  const res = await axios.get(`/tasks/${id}`);
  return res.data;
};

export const addTask = async (task) => {
  await axios.post("/tasks", task);
};

export const updateTask = async (id, task) => {
  await axios.put(`/tasks/${id}`, task);
};

export const removeTask = async (id) => {
  await axios.delete(`/tasks/${id}`);
};
