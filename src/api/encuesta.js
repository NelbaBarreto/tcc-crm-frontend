import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const getPreguntas = async () => {
  const { data: response } = await axios.get(`${API}/encuesta/preguntas`);
  return response.data;
};

export const validarToken = async (data) => {
  const { data: response } = await axios.post(`${API}/encuesta/validarToken`, data);
  return response.data;
};

export const enviarEncuesta = async (data) => {
  console.log(data)
  const { data: response } = await axios.post(`${API}/encuesta/enviar`, data);
  return response.data;
};