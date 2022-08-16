import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./components/home/Login";
//import Sidemenu from "./components/home/Sidemenu";
import Dashboard from "./components/home/Dashboard";
import CrearUsuario from "./components/usuarios/CrearUsuario";
import useToken from "../src/utils/useToken";

const MainApp = () => {
  const { token, setToken } = useToken();
  //const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<Navbar />}> */}
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/usuarios" element={<CrearUsuario />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default MainApp;
