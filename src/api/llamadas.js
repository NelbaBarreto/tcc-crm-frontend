import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createLlamada = async (data) => {
  const { data: response } = await axios.post(`${API}/llamadas`, data);
  return response.data;
};

export const getLlamadas = async () => {
  const { data: response } = await axios.get(`${API}/llamadas`);
  return response.data;
};

export const getLlamada = async id => {
  const { data: response } = await axios.get(`${API}/llamadas/${id}`);
  return response.data;
};