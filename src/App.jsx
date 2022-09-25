import React from "react";
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import Login from "./components/home/Login";
import Layout from "./components/layout/Index";
import Dashboard from "./components/dashboard/Index";

// Empleado
import ListarEmpleados from "./components/empleados/Index";
import CrearEmpleado from "./components/empleados/CrearEmpleado";
import MostrarEmpleado from "./components/empleados/MostrarEmpleado";

//Países
import ListarPaises from "./components/parametros/paises/Index";
import CrearPais from "./components/parametros/paises/CrearPais";

// Ciudades
import ListarCiudades from "./components/parametros/ciudades/Index";
import CrearCiudad from "./components/parametros/ciudades/CrearCiudad";

// Motivos
import CrearMotivo from "./components/parametros/motivos/CrearMotivo";

// Campañas
import ListarCampana from "./components/marketing/campanas/Index";
import CrearCampana from "./components/marketing/campanas/CrearCampana";

// Tipo Campaña
import ListarTipcampana from "./components/marketing/tipo_campanas/Index";
import CrearTipoCampana from "./components/marketing/tipo_campanas/CrearTipoCampana";

//Ventas
//Leads
import ListarLead from "./components/ventas/leads/Index";
import CrearLead from "./components/ventas/leads/CrearLead";

//Contacto
import CrearContacto from "./components/ventas/CrearContacto";

//Organización
import CrearOrganizacion from "./components/ventas/CrearOrganizacion";

//Oportunidad
import CrearOportunidad from "./components/ventas/CrearOportunidad";

//Soporte
import CrearCaso from "./components/soporte/CrearCaso";
import Calendario from "./components/actividades/Calendario";
import CrearLlamada from "./components/actividades/CrearLlamada";
import CrearTarea from "./components/actividades/CrearTarea";
//Cursos
import ListarCursos from "./components/educacion/cursos/Index";
import CrearCurso from "./components/educacion/cursos/CrearCurso";

import CrearProfesor from "./components/educacion/profesores/CrearProfesor";
import CrearSucursal from "./components/educacion/sucursales/CrearSucursal";
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
          {/* Empleados */}
          <Route exact path="/admin/empleados" element={<ListarEmpleados />} />
          <Route path="/admin/empleados/nuevo" element={<CrearEmpleado />} />
          <Route exact path="/admin/empleados/:id" element={<MostrarEmpleado />} />

          {/* Países */}
          <Route exact path="/parametros/paises" element={<ListarPaises />} />
          <Route path="/parametros/paises/nuevo" element={<CrearPais />} />

          {/* Ciudades */}
          <Route exact path="/parametros/ciudades" element={<ListarCiudades />} />
          <Route path="/parametros/ciudades/nuevo" element={<CrearCiudad />} />

          <Route path="/parametros/motivos" element={<CrearMotivo />} />

          {/* Campañas */}
          <Route exact path="/marketing/campanas" element={<ListarCampana />} />
          <Route path="/marketing/campanas/nuevo" element={<CrearCampana />} />

          {/* Tipo Campañas */}
          <Route exact path="/marketing/tipocampana" element={<ListarTipcampana />} />
          <Route path="/marketing/tipocampana/nuevo" element={<CrearTipoCampana />} />
          {/* Leads */}
          <Route exact path="/ventas/leads" element={<ListarLead />} />
          <Route path="/ventas/leads/nuevo" element={<CrearLead />} />
          
          <Route path="/ventas/contactos" element={<CrearContacto />} />
          <Route path="/ventas/organizaciones" element={<CrearOrganizacion />} />
          <Route path="/ventas/oportunidades" element={<CrearOportunidad />} />
          <Route path="/soporte/casos" element={<CrearCaso />} />
          <Route path="/actividades/calendario" element={<Calendario />} />
          <Route path="/actividades/tareas" element={<CrearTarea />} />
          <Route path="/actividades/llamadas" element={<CrearLlamada />} />
          {/* Educación */}
          <Route exact path="/educacion/cursos" element={<ListarCursos />} />
          <Route path="/educacion/cursos/nuevo" element={<CrearCurso />} />
          {/* // */}
          <Route path="/educacion/profesores" element={<CrearProfesor />} />
          <Route path="/educacion/sucursales" element={<CrearSucursal />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default MainApp;
