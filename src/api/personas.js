import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createPersona = async (data) => {
  const { data: response } = await axios.post(`${API}/personas`, data);
  return response.data;
};

export const getTipDocumentos = async (data) => {
  const { data: response } = await axios.get(`${API}/personas/tip_documentos`, data);
  return response.data;
};

export const getTiposDireccion = async () => {
  const { data: response } = await axios.get(`${API}/direcciones/tipos`);
  return response.data;
};