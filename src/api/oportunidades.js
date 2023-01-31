import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createOportunidad = async data => {
  const { data: response } = await axios.post(`${API}/oportunidades`, data);
  return response.data;
};

export const getOportunidades = async ({ contacto_id }) => {
  let url = `${API}/oportunidades`;
  if (contacto_id) {
    url += `?contacto_id=${contacto_id}`;
  }
  const { data: response } = await axios.get(url);
  return response.data;
};

export const getOportunidad = async id => {
  const { data: response } = await axios.get(`${API}/oportunidades/${id}`);
  return response.data;
};

export const getEstados = async id => {
  const { data: response } = await axios.get(`${API}/oportunidades/estados`);
  return response.data;
};

export const editOportunidad = async (id, data) => {
  const { data: response } = await axios.put(`${API}/oportunidades/${id}`, { id, oportunidad: data });
  return response.data;
};