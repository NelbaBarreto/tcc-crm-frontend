import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const getCasosPorEstado = async () => {
  const { data: response } = await axios.get(`${API}/dashboard/casosPorEstado`);
  return response.data;
};

export const getCasosPorTipo = async () => {
  const { data: response } = await axios.get(`${API}/dashboard/casosPorTipo`);
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

export const getCasosActivosPorPrioridad = async () => {
  const { data: response } = await axios.get(`${API}/dashboard/casosActivosPorPrioridad`);
  return response.data;
};

export const getCasosPorOrigen = async () => {
  const { data: response } = await axios.get(`${API}/dashboard/casosPorOrigen`);
  return response.data;
};

