import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const getPreguntas = async () => {
  const { data: response } = await axios.get(`${API}/encuesta/preguntas`);
  return response.data;
};
