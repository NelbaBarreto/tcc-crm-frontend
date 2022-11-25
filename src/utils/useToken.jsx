import { useState } from "react";

const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const getUsuario = () => {
    const userString = localStorage.getItem("usuario");
    const user = JSON.parse(userString);
    return user?.usuario
  };

  const [token, setToken] = useState(getToken());
  const [usuario, setUsuario] = useState(getUsuario());

  const saveToken = (token, user) => {
    localStorage.setItem("token", JSON.stringify({ token}));
    localStorage.setItem("usuario", JSON.stringify({ usuario: user }));
    setToken(token);
    setUsuario(user);
  };

  return {
    setToken: saveToken,
    token,
    usuario
  }
};

export default useToken;