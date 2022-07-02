import axios from "axios";

const API = process.env.REACT_APP_API || "http://localhost:8080/api"

export const getUsuarios = async() => {
  console.log(data)
  const { data } = await axios.get(`${API}/usuarios`); 
  return data;
};