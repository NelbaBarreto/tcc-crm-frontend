import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createTip_campana = async (data) => {
  const { data: response } = await axios.post(`${API}/tip_campanas`, data);
  return response.data;
};

export const getTip_campanas = async () => {
  const { data: response } = await axios.get(`${API}/tip_campanas`);
  return response.data;
};

export const getTip_campana = async id => {
  const { data: response } = await axios.get(`${API}/tip_campanas/${id}`);
  return response.data;
};