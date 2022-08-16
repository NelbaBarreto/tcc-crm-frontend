import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const getUsuarios = async() => {
  const { data } = await axios.get(`${API}/usuarios`); 
  return data;
};

export const createUsuarios = async (data) => {
  const { data: response } = await axios.post(`${API}/usuarios`, data);
  return response.data;
};

export const autenticarUsuarios = async (data) => {
  const { data: response } = await axios.post(`${API}/usuarios/login`, data);
  return response;
};