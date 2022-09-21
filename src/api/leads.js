import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createLead = async (data) => {
  const { data: response } = await axios.post(`${API}/leads`, data);
  return response.data;
};

export const getLeads = async () => {
  const { data: response } = await axios.get(`${API}/leads`);
  return response.data;
};

export const getLead = async id => {
  const { data: response } = await axios.get(`${API}/leads/${id}`);
  return response.data;
};