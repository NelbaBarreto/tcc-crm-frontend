import axios from "axios";
import { parseISO } from "date-fns";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createCampana = async (data) => {
  try {
    const { data: response } = await axios.post(`${API}/campanas`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getCampanas = async () => {
  const { data: response } = await axios.get(`${API}/campanas`);
  return response.data;
};

export const getCampana = async id => {
  const { data: response } = await axios.get(`${API}/campanas/${id}`);
  const data = { ...response.data, fec_inicio: parseISO(response.data.fec_inicio),
    fec_fin: parseISO(response.data.fec_fin) }
  return data;
  // return response.data;
};

export const editCampana = async (id, data) => {
  // const { data: response } = await axios.put(`${API}/campanas/${id}`, { id, campana: data });
  // return response.data;
  try {
    const { data: response } = await axios.put(`${API}/campanas/${id}`, { id, campana: data });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleCampana = async (id) => {
  const { data: response } = await axios.delete(`${API}/campanas/${id}`);
  return response.data;
};