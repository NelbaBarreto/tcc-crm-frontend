import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createTarea = async (data) => {
  const { data: response } = await axios.post(`${API}/tareas`, data);
  return response.data;
};

export const getTareas = async () => {
  const { data: response } = await axios.get(`${API}/tareas`);
  return response.data;
};

export const getTarea = async id => {
  const { data: response } = await axios.get(`${API}/tareas/${id}`);
  return response.data;
};

export const getPrioridades = async () => {
  const { data: response } = await axios.get(`${API}/tareas/prioridades`);
  return response.data;
};

export const getEstados = async () => {
  const { data: response } = await axios.get(`${API}/tareas/estados`);
  return response.data;
};