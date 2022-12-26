import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createCaso = async (data) => {
  const { data: response } = await axios.post(`${API}/casos`, data);
  return response.data;
};

export const getCasos = async () => {
  const { data: response } = await axios.get(`${API}/casos`);
  return response.data;
};

export const getCaso = async id => {
  const { data: response } = await axios.get(`${API}/casos/${id}`);
  return response.data;
};

export const getOrigenes = async () => {
  const { data: response } = await axios.get(`${API}/casos/origenes`);
  return response.data;
};

export const getPrioridades = async () => {
  const { data: response } = await axios.get(`${API}/casos/prioridades`);
  return response.data;
};

export const getEstados = async () => {
  const { data: response } = await axios.get(`${API}/casos/estados`);
  return response.data;
};

export const getTipos = async () => {
  const { data: response } = await axios.get(`${API}/casos/tipos`);
  return response.data;
};

export const editCaso = async (id, data) => {
  const { data: response } = await axios.put(`${API}/casos/${id}`, { id, caso: data });
  return response.data;
};
