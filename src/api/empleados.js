import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createEmpleado = async (data) => {
  const { data: response } = await axios.post(`${API}/empleados`, data);
  return response.data;
};

export const getEmpleados = async () => {
  const { data: response } = await axios.get(`${API}/empleados`);
  return response.data;
};

export const getEmpleado = async id => {
  const { data: response } = await axios.get(`${API}/empleados/${id}`);
  return response.data;
};

export const editEmpleado = async (id, data) => {
  const { data: response } = await axios.put(`${API}/empleados/${id}`, { id, empleado: data });
  return response.data;
};