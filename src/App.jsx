import React from "react";
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";

import Login from "./components/home/Login";
import Layout from "./components/layout/Index";
import Dashboard from "./components/dashboard/Index";
import CrearUsuario from "./components/usuarios/CrearUsuario";
import CrearPais from "./components/parametros/CrearPais";
import useToken from "../src/utils/useToken";

const MainApp = () => {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuarios" element={<CrearUsuario />} />
          <Route path="/parametros/paises" element={<CrearPais />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default MainApp;
