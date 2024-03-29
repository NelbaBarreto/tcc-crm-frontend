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

export const getTareasPorEstado = async () => {
  const { data: response } = await axios.get(`${API}/dashboard/tareasPorEstado`);
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

export const getTareasActivasPorPrioridad = async () => {
  const { data: response } = await axios.get(`${API}/dashboard/tareasActivasPorPrioridad`);
  return response.data;
};

export const getLeadsPorOrigen = async () => {
  const { data: response } = await axios.get(`${API}/dashboard/leadsPorOrigen`);
  return response.data;
};

export const getRespuestasPorValor = async () => {
  const { data: response } = await axios.get(`${API}/dashboard/respuestasPorValor`);
  return response.data;
};

export const getCsat = async () => {
  const { data: response } = await axios.get(`${API}/dashboard/csat`);
  return response.data;
};

export const getOportunidadesGanadasPorCurso = async () => {
  const { data: response } = await axios.get(`${API}/dashboard/oportunidadesGanadasPorCurso`);
  return response.data;
};

export const getLeadsPorCampana = async () => {
  const { data: response } = await axios.get(`${API}/dashboard/leadsPorCampana`);
  return response.data;
};

export const getOportunidadesPorCampana = async () => {
  const { data: response } = await axios.get(`${API}/dashboard/oportunidadesPorCampana`);
  return response.data;
};