import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createMotivo = async (data) => {
  const { data: response } = await axios.post(`${API}/motivos`, data);
  return response.data;
};

export const getMotivos = async () => {
  const { data: response } = await axios.get(`${API}/motivos`);
  return response.data;
};

export const getMotivo = async id => {
  const { data: response } = await axios.get(`${API}/motivos/${id}`);
  return response.data;
};