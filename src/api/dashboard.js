import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const getCasosPorEstado = async () => {
  const { data: response } = await axios.get(`${API}/dashboard/casosPorEstado`);
  return response.data;
};

export const getLeadsPorEstado = async () => {
  const { data: response } = await axios.get(`${API}/dashboard/leadsPorEstado`);
  return response.data;
};

export const getLlamadasPorEstado = async () => {
  const { data: response } = await axios.get(`${API}/dashboard/llamadasPorEstado`);
  return response.data;
};

export const getCasosPorPrioridad = async () => {
  const { data: response } = await axios.get(`${API}/dashboard/casosPorPrioridad`);
  return response.data;
};

