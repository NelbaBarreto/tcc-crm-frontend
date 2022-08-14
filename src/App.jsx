import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./components/home/Login";
import Index from "./components/home/Index";
//import Sidemenu from "./components/home/Sidemenu";
import Navbar from "./components/home/Navbar";
import CrearUsuario from "./components/usuarios/CrearUsuario";

const MainApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route element={<Navbar />}> */}
          <Route exact path="/" element={<Index />} />
          <Route path="/usuarios" element={<CrearUsuario />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default MainApp;
