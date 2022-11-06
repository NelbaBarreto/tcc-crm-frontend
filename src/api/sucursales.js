import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createSucursal = async (data) => {
  const { data: response } = await axios.post(`${API}/sucursales`, data);
  return response.data;
};

export const getSucursales = async () => {
  const { data: response } = await axios.get(`${API}/sucursales`);
  return response.data;
};

export const getSucursal = async id => {
  const { data: response } = await axios.get(`${API}/sucursales/${id}`);
  return response.data;
};