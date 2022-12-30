import axios from "axios";
import { format, parseISO } from "date-fns";

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
  const data = { ...response.data, fec_inicio: parseISO(response.data.fec_inicio) }
  return data;
};

export const getTipos = async () => {
  const { data: response } = await axios.get(`${API}/llamadas/tipos`);
  return response.data;
};

export const getEstados = async () => {
  const { data: response } = await axios.get(`${API}/llamadas/estados`);
  return response.data;
};

export const editLlamadas = async (id, data) => {
  const { data: response } = await axios.put(`${API}/llamadas/${id}`, { id, llamada: data });
  return response.data;
};

export const deleLlamada = async (id) => {
  const { data: response } = await axios.delete(`${API}/llamadas/${id}`);
  return response.data;
};