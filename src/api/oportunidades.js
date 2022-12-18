import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createOportunidad = async data => {
  const { data: response } = await axios.post(`${API}/oportunidades`, data);
  return response.data;
};

export const getOportunidades = async () => {
  const { data: response } = await axios.get(`${API}/oportunidades`);
  return response.data;
};

export const getOportunidad = async id => {
  const { data: response } = await axios.get(`${API}/oportunidades/${id}`);
  return response.data;
};

export const getEtapas = async id => {
  const { data: response } = await axios.get(`${API}/oportunidades/etapas`);
  return response.data;
};