import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./components/home/Login";
import CrearUsuario from "./components/usuarios/CrearUsuario";

const MainApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/usuarios" element={<CrearUsuario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainApp;
