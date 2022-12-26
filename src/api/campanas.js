import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createCampana = async (data) => {
  const { data: response } = await axios.post(`${API}/campanas`, data);
  return response.data;
};

export const getCampanas = async () => {
  const { data: response } = await axios.get(`${API}/campanas`);
  return response.data;
};

export const getCampana = async id => {
  const { data: response } = await axios.get(`${API}/campanas/${id}`);
  return response.data;
};

export const editCampana = async (id, data) => {
  const { data: response } = await axios.put(`${API}/campanas/${id}`, { id, campana: data });
  return response.data;
};