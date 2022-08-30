import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createEmpleado = async (data) => {
  const { data: response } = await axios.post(`${API}/empleados`, data);
  return response.data;
};

export const getEmpleados = async (data) => {
  const { data: response } = await axios.get(`${API}/empleados`, data);
  return response.data;
};