import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const getCasosPorEstado = async () => {
  const { data: response } = await axios.get(`${API}/dashboard/casosPorEstado`);
  return response.data;
};

