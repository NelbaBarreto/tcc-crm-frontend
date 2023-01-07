import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createContacto = async (data) => {
  const { data: response } = await axios.post(`${API}/contactos`, data);
  return response.data;
};

export const getContactos = async () => {
  const { data: response } = await axios.get(`${API}/contactos`);
  return response.data;
};

export const getContacto = async id => {
  const { data: response } = await axios.get(`${API}/contactos/${id}`);
  return response.data;
};

export const getTokenEncuesta = async (contacto_id, oportunidad_id) => {
  const { data: response } = await axios.get(`${API}/generarTokenEncuesta/${contacto_id}/${oportunidad_id}`);
  return response.data;
};

export const getOrigenes = async () => {
  const { data: response } = await axios.get(`${API}/contactos/origenes`);
  return response.data;
};
