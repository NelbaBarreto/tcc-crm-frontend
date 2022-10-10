import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createCurso = async (data) => {
  const { data: response } = await axios.post(`${API}/cursos`, data);
  return response.data;
};

export const getCursos = async () => {
  const { data: response } = await axios.get(`${API}/cursos`);
  return response.data;
};

export const getCurso = async id => {
  const { data: response } = await axios.get(`${API}/cursos/${id}`);
  return response.data;
};