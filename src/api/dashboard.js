import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const getCasosPorEstado = async () => {
  const response  = await axios.get(`${API}/dashboard/casosPorEstado`);
  console.log(response);
  return response;
};

