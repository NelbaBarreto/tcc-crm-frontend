import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createLead = async (data) => {
  try {
    const { data: response } = await axios.post(`${API}/leads`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getLeads = async () => {
  const { data: response } = await axios.get(`${API}/leads`);
  return response.data;
};

export const getLead = async id => {
  const { data: response } = await axios.get(`${API}/leads/${id}`);
  return response.data;
};

export const editLead = async (id, data) => {
  const { data: response } = await axios.put(`${API}/leads/${id}`, { id, lead: data });
  return response.data;
};

export const getEstados = async () => {
  const { data: response } = await axios.get(`${API}/leads/estados`);
  return response.data;
};

export const getOrigenes = async () => {
  const { data: response } = await axios.get(`${API}/leads/origenes`);
  return response.data;
};