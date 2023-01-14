import React, { useReducer } from "react";
import { reducer } from "./components/formulario/reducerFormularios.js";
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import Login from "./components/home/Login";
import Dashboard from "./components/dashboard/assets/js/MainDash";
import AppContext from "./utils/AppContext";

import ProtectedRoute from "./components/home/ProtectedRoute.jsx";

// Empleado
import ListarEmpleados from "./components/empleados/Index";
import CrearEmpleado from "./components/empleados/CrearEmpleado";
import MostrarEmpleado from "./components/empleados/MostrarEmpleado";

//Países
import ListarPaises from "./components/parametros/paises/Index";
import CrearPais from "./components/parametros/paises/CrearPais";
import MostrarPais from "./components/parametros/paises/MostrarPais";

// Ciudades
import ListarCiudades from "./components/parametros/ciudades/Index";
import CrearCiudad from "./components/parametros/ciudades/CrearCiudad";
import MostrarCiudad from "./components/parametros/ciudades/MostrarCiudad";
import EditarCiudad from "./components/parametros/ciudades/EditarCiudad";
import EliminarCiudad from "./components/parametros/ciudades/EliminarCiudad";

// Motivos
import CrearMotivo from "./components/parametros/motivos/CrearMotivo";

// Campañas
import ListarCampana from "./components/marketing/campanas/Index";
import CrearCampana from "./components/marketing/campanas/CrearCampana";
import EditarCampana from "./components/marketing/campanas/EditarCampana";
import MostrarCampana from "./components/marketing/campanas/MostrarCampana";
import EliminarCampana from "./components/marketing/campanas/EliminarCampana";

// Tipo Campaña
import ListarTipcampana from "./components/marketing/tipo_campanas/Index";
import CrearTipoCampana from "./components/marketing/tipo_campanas/CrearTipoCampana";

//Ventas
//Leads
import ListarLeads from "./components/ventas/leads/Index";
import CrearLead from "./components/ventas/leads/CrearLead";
import MostrarLead from "./components/ventas/leads/MostrarLead";
import EditarLead from "./components/ventas/leads/EditarLead";

//Contactos
import ListarContactos from "./components/ventas/contactos/Index";
import CrearContacto from "./components/ventas/contactos/CrearContacto";

//Organizaciones
import ListarOrganizaciones from "./components/ventas/organizaciones/Index";
import CrearOrganizacion from "./components/ventas/organizaciones/CrearOrganizacion";

//Oportunidades
import ListarOportunidades from "./components/ventas/oportunidades/Index";
import CrearOportunidad from "./components/ventas/oportunidades/CrearOportunidad";

//Soporte
//Caso
import ListarCaso from "./components/soporte/casos/Index";
import CrearCaso from "./components/soporte/casos/CrearCaso";
import EditarCaso from "./components/soporte/casos/EditarCaso";
import MostrarCaso from "./components/soporte/casos/MostrarCaso";
import EliminarCaso from "./components/soporte/casos/EliminarCaso";

//Actividades
import Calendario from "./components/actividades/calendario/Calendario";

//Llamadas
import ListarLlamada from "./components/actividades/llamada/Index";
import CrearLlamada from "./components/actividades/llamada/CrearLlamada";
import EditarLlamada from "./components/actividades/llamada/EditarLlamada";
import MostrarLlamada from "./components/actividades/llamada/MostrarLlamada";
import EliminarLlamada from "./components/actividades/llamada/EliminarLlamada";

//Tareas
import ListarTarea from "./components/actividades/tarea/Index";
import CrearTarea from "./components/actividades/tarea/CrearTarea";
import MostrarTarea from "./components/actividades/tarea/MostrarTarea";
import EditarTarea from "./components/actividades/tarea/EditarTarea";
import EliminarTarea from "./components/actividades/tarea/EliminarTarea";

//Cursos
import ListarCursos from "./components/educacion/cursos/Index";
import CrearCurso from "./components/educacion/cursos/CrearCurso";
import MostrarCurso from "./components/educacion/cursos/MostrarCurso";
import EliminarCurso from "./components/educacion/cursos/EliminarCurso";
import EditarCurso from "./components/educacion/cursos/EditarCurso";

// Ciclos
// import CrearCiclo from "./components/educacion/ciclos/CrearCiclo";

// Profesores
import CrearProfesor from "./components/educacion/profesores/CrearProfesor";
import ListarProfesores from "./components/educacion/profesores/Index";

// Sucursales
import CrearSucursal from "./components/educacion/sucursales/CrearSucursal";
import ListarSucursales from "./components/educacion/sucursales/Index";
import MostrarSucursal from "./components/educacion/sucursales/MostrarSucursal";
import EliminarSucursal from "./components/educacion/sucursales/EliminarSucursal";

import CSAT from "./components/encuestas/CSAT.jsx";

import useToken from "../src/utils/useToken";

const initialState = {};

const MainApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setToken, usuario } = useToken();

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Router>
        {/* <Layout> */}
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute usuario={usuario}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute usuario={usuario}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Empleados */}
          <Route
            exact
            path="/admin/empleados"
            element={
              <ProtectedRoute usuario={usuario}>
                <ListarEmpleados />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/empleados/nuevo"
            element={
              <ProtectedRoute usuario={usuario}>
                <CrearEmpleado />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/empleados/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <MostrarEmpleado />
              </ProtectedRoute>
            }
          />

          {/* Países */}
          <Route exact path="/parametros/paises" element={<ListarPaises />} />
          <Route path="/parametros/paises/nuevo" element={<CrearPais />} />
          <Route path="/parametros/paises/:id" element={<MostrarPais />} />

          {/* Ciudades */}
          <Route exact path="/parametros/ciudades" element={<ListarCiudades />} />
          <Route path="/parametros/ciudades/nuevo" element={<CrearCiudad />} />
          <Route path="/parametros/ciudades/editar/:id" element={<EditarCiudad />} />
          <Route path="/parametros/ciudades/:id" element={<MostrarCiudad />} />
          <Route path="/parametros/ciudades/eliminar/:id" element={<EliminarCiudad />} />

          <Route path="/parametros/motivos" element={<CrearMotivo />} />

          {/* Campañas */}
          <Route
            exact
            path="/marketing/campanas"
            element={
              <ProtectedRoute usuario={usuario}>
                <ListarCampana />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marketing/campanas/nuevo"
            element={
              <ProtectedRoute usuario={usuario}>
                <CrearCampana />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marketing/campanas/editar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EditarCampana />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/marketing/campanas/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <MostrarCampana />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/marketing/campanas/eliminar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EliminarCampana />
              </ProtectedRoute>
            }
          />

          {/* Tipo Campañas */}
          <Route exact path="/marketing/tipocampana" element={<ListarTipcampana />} />
          <Route path="/marketing/tipocampana/nuevo" element={<CrearTipoCampana />} />

          {/* Leads */}
          <Route
            exact
            path="/ventas/leads"
            element={
              <ProtectedRoute usuario={usuario}>
                <ListarLeads />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ventas/leads/nuevo"
            element={
              <ProtectedRoute usuario={usuario}>
                <CrearLead />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/ventas/leads/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <MostrarLead />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ventas/leads/editar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EditarLead />
              </ProtectedRoute>
            }
          />

          {/* Contactos */}
          <Route
            exact
            path="/ventas/contactos"
            element={
              <ProtectedRoute usuario={usuario}>
                <ListarContactos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ventas/contactos/nuevo"
            element={
              <ProtectedRoute usuario={usuario}>
                <CrearContacto />
              </ProtectedRoute>
            }
          />

          {/* Organizaciones */}
          <Route
            exact
            path="/ventas/organizaciones"
            element={
              <ProtectedRoute usuario={usuario}>
                <ListarOrganizaciones />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ventas/organizaciones/nuevo"
            element={
              <ProtectedRoute usuario={usuario}>
                <CrearOrganizacion />
              </ProtectedRoute>
            }
          />

          {/* Oportunidades */}
          <Route
            exact
            path="/ventas/oportunidades"
            element={
              <ProtectedRoute usuario={usuario}>
                <ListarOportunidades />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ventas/oportunidades/nuevo"
            element={
              <ProtectedRoute usuario={usuario}>
                <CrearOportunidad />
              </ProtectedRoute>
            }
          />

          {/* Casos */}
          <Route
            exact
            path="/soporte/casos"
            element={
              <ProtectedRoute usuario={usuario}>
                <ListarCaso />
              </ProtectedRoute>
            }
          />
          <Route
            path="/soporte/casos/nuevo"
            element={
              <ProtectedRoute usuario={usuario}>
                <CrearCaso />
              </ProtectedRoute>
            }
          />
          <Route
            path="/soporte/casos/editar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EditarCaso />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/soporte/casos/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <MostrarCaso />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/soporte/casos/eliminar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EliminarCaso />
              </ProtectedRoute>
            }
          />

          {/* Tareas */}
          <Route
            exact
            path="/actividades/tareas/"
            element={
              <ProtectedRoute usuario={usuario}>
                <ListarTarea />
              </ProtectedRoute>
            }
          />
          <Route
            path="/actividades/tareas/nuevo"
            element={
              <ProtectedRoute usuario={usuario}>
                <CrearTarea />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/actividades/tareas/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <MostrarTarea />
              </ProtectedRoute>
            }
          />
          <Route
            path="/actividades/tareas/editar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EditarTarea />
              </ProtectedRoute>
            }
          />
          <Route
            path="/actividades/tareas/eliminar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EliminarTarea />
              </ProtectedRoute>
            }
          />

          {/* Llamadas */}
          <Route
            exact
            path="/actividades/llamadas"
            element={
              <ProtectedRoute usuario={usuario}>
                <ListarLlamada />
              </ProtectedRoute>
            }
          />
          <Route
            path="/actividades/llamadas/nuevo"
            element={
              <ProtectedRoute usuario={usuario}>
                <CrearLlamada />
              </ProtectedRoute>
            }
          />
          <Route
            path="/actividades/llamadas/editar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EditarLlamada />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/actividades/llamadas/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <MostrarLlamada />
              </ProtectedRoute>
            }
          />
          <Route
            path="/actividades/llamadas/eliminar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EliminarLlamada />
              </ProtectedRoute>
            }
          />

          {/* Calendarios */}
          <Route
            path="/actividades/calendario"
            element={
              <ProtectedRoute usuario={usuario}>
                <Calendario />
              </ProtectedRoute>
            }
          />

          {/* Cursos */}
          <Route
            exact
            path="/educacion/cursos"
            element={
              <ProtectedRoute usuario={usuario}>
                <ListarCursos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/educacion/cursos/nuevo"
            element={
              <ProtectedRoute usuario={usuario}>
                <CrearCurso />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/educacion/cursos/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <MostrarCurso />
              </ProtectedRoute>
            }
          />
          <Route
            path="/educacion/cursos/eliminar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EliminarCurso />
              </ProtectedRoute>
            }
          />
          <Route
            path="/educacion/cursos/editar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EditarCurso />
              </ProtectedRoute>
            }
          />

          {/* Ciclos */}
          {/* <Route exact path="/educacion/cursos/:curso_id/ciclos/nuevo" element={<CrearCiclo />} /> */}

          {/* Educación */}
          <Route
            exact
            path="/educacion/profesores"
            element={
              <ProtectedRoute usuario={usuario}>
                <ListarProfesores />
              </ProtectedRoute>
            }
          />
          <Route
            path="/educacion/profesores/nuevo"
            element={
              <ProtectedRoute usuario={usuario}>
                <CrearProfesor />
              </ProtectedRoute>
            }
          />

          {/* Sucursales */}
          <Route
            exact
            path="/educacion/sedes"
            element={
              <ProtectedRoute usuario={usuario}>
                <ListarSucursales />
              </ProtectedRoute>
            }
          />
          <Route
            path="/educacion/sedes/nuevo"
            element={
              <ProtectedRoute usuario={usuario}>
                <CrearSucursal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/educacion/sedes/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <MostrarSucursal />
              </ProtectedRoute>
            }
          />
          <Route path="/educacion/sedes/eliminar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EliminarSucursal />
              </ProtectedRoute>
            }
          />

          {/* Rutas Públicas */}
          <Route path="/encuesta/:token" element={<CSAT />} />
          <Route path="*" element={<p>La página no existe: 404!</p>} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default MainApp;
