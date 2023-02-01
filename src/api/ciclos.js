import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createCiclo = async (data) => {
  const { data: response } = await axios.post(`${API}/ciclos`, data);
  return response.data;
};

export const getCiclos = async () => {
  const { data: response } = await axios.get(`${API}/ciclos`);
  return response.data;
};

export const getCiclo = async id => {
  const { data: response } = await axios.get(`${API}/ciclos/${id}`);
  return response.data;
};

export const editCiclo = async (id, data) => {
  const { data: response } = await axios.put(`${API}/ciclos/${id}`, { id, ciclo: data });
  return response.data;
};

export const deleCiclo = async (id) => {
  const { data: response } = await axios.delete(`${API}/ciclos/${id}`);
  return response.data;
};