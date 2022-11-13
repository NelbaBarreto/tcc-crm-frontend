import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createProfesor = async (data) => {
  const { data: response } = await axios.post(`${API}/profesores`, data);
  return response.data;
};

export const getProfesores = async () => {
  const { data: response } = await axios.get(`${API}/profesores`);
  return response.data;
};

export const getProfesor = async id => {
  const { data: response } = await axios.get(`${API}/profesores/${id}`);
  return response.data;
};