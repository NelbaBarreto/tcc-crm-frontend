import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createSede = async (data) => {
  const { data: response } = await axios.post(`${API}/sedes`, data);
  return response.data;
};

export const getSedes = async () => {
  const { data: response } = await axios.get(`${API}/sedes`);
  return response.data;
};

export const getSede = async id => {
  const { data: response } = await axios.get(`${API}/sedes/${id}`);
  return response.data;
};

export const deleteSede = async (id) => {
  const { data: response } = await axios.delete(`${API}/sedes/${id}`);
  return response.data;
};

export const deleteDireccion = async (id) => {
  const { data: response } = await axios.delete(`${API}/direcciones/${id}`);
  return response.data;
};