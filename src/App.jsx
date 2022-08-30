import React from "react";
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";

import Login from "./components/home/Login";
import Layout from "./components/layout/Index";
import Dashboard from "./components/dashboard/Index";

// Empleado
import ListarEmpleados from "./components/empleados/Index";
import CrearEmpleado from "./components/empleados/CrearEmpleado";

import CrearPais from "./components/parametros/CrearPais";
import CrearCiudad from "./components/parametros/CrearCiudad";
import CrearMotivo from "./components/parametros/CrearMotivo";
import CrearCampana from "./components/marketing/CrearCampana";
import CrearTipoCampana from "./components/marketing/CrearTipoCampana";
import CrearLead from "./components/ventas/CrearLead";
import CrearContacto from "./components/ventas/CrearContacto";
import CrearOrganizacion from "./components/ventas/CrearOrganizacion";
import CrearOportunidad from "./components/ventas/CrearOportunidad";
import CrearCaso from "./components/soporte/CrearCaso";
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
          { /* Empleados */}
          <Route exact path="/admin/empleados" element={<ListarEmpleados />} />
          <Route path="/admin/empleados/nuevo" element={<CrearEmpleado />} />
          <Route path="/parametros/paises" element={<CrearPais />} />
          <Route path="/parametros/ciudades" element={<CrearCiudad />} />
          <Route path="/parametros/motivos" element={<CrearMotivo />} />
          <Route path="/marketing/campanas" element={<CrearCampana />} />
          <Route path="/marketing/tipocampana" element={<CrearTipoCampana />} />
          <Route path="/ventas/leads" element={<CrearLead />} />
          <Route path="/ventas/contactos" element={<CrearContacto />} />
          <Route path="/ventas/organizaciones" element={<CrearOrganizacion />} />
          <Route path="/ventas/oportunidades" element={<CrearOportunidad />} />
          <Route path="/soporte/casos" element={<CrearCaso />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default MainApp;
