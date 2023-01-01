import axios from "axios";
import { format, parseISO } from "date-fns";

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
  const data = { ...response.data, fec_inicio: parseISO(response.data.fec_inicio),
    fec_fin: parseISO(response.data.fec_fin) }
  return data;
};

export const getPrioridades = async () => {
  const { data: response } = await axios.get(`${API}/tareas/prioridades`);
  return response.data;
};

export const getEstados = async () => {
  const { data: response } = await axios.get(`${API}/tareas/estados`);
  return response.data;
};

export const editTarea = async (id, data) => {
  const { data: response } = await axios.put(`${API}/tareas/${id}`, { id, tarea: data });
  return response.data;
};

export const deleTarea = async (id) => {
  const { data: response } = await axios.delete(`${API}/tareas/${id}`);
  return response.data;
};