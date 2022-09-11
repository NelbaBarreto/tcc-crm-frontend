import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createCiudad = async (data) => {
  const { data: response } = await axios.post(`${API}/ciudades`, data);
  return response.data;
};

export const getCiudades = async () => {
  const { data: response } = await axios.get(`${API}/ciudades`);
  return response.data;
};

export const getCiudad = async id => {
  const { data: response } = await axios.get(`${API}/ciudades/${id}`);
  return response.data;
};