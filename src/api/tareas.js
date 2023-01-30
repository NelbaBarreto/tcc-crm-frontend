import axios from "axios";
import { parseISO } from "date-fns";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createTarea = async (data) => {
  const { data: response } = await axios.post(`${API}/tareas`, data);
  return response.data;
};

export const getTareas = async ({ lead_id, contacto_id }) => {
  let url = `${API}/tareas`;
  if (lead_id) {
    url += `?lead_id=${lead_id}`;
  } else if (contacto_id) {
    url += `?contacto_id=${contacto_id}`;
  }

  const { data: response } = await axios.get(url);
  return response.data;
};

export const getTarea = async id => {
  const { data: response } = await axios.get(`${API}/tareas/${id}`);
  const data = { ...response.data, fec_inicio: response.data.fec_inicio ? parseISO(response.data.fec_inicio) : null,
    fec_fin: response.data.fec_fin ? parseISO(response.data.fec_fin) : null}
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