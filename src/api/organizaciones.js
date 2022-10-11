import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createOrganizacion = async (data) => {
  const { data: response } = await axios.post(`${API}/organizaciones`, data);
  return response.data;
};

export const getOrganizaciones = async () => {
  const { data: response } = await axios.get(`${API}/organizaciones`);
  return response.data;
};

export const getOrganizacion = async id => {
  const { data: response } = await axios.get(`${API}/organizaciones/${id}`);
  return response.data;
};