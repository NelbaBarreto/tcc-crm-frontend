import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const createPersona = async (data) => {
  const { data: response } = await axios.post(`${API}/personas`, data);
  return response.data;
};