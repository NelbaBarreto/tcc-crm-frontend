import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createPais = async (data) => {
  const { data: response } = await axios.post(`${API}/paises`, data);
  return response.data;
};

export const getPaises = async () => {
  const { data: response } = await axios.get(`${API}/paises`);
  return response.data;
};

export const getPais = async id => {
  const { data: response } = await axios.get(`${API}/paises/${id}`);
  return response.data;
};