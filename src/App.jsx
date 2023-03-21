import React, { useReducer } from "react";
import { reducer } from "./components/formulario/reducerFormularios.js";
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import Login from "./components/home/Login";
import Dashboard from "./components/dashboard/Index";
import NotFound from "./components/NotFound.jsx";
import AppContext from "./utils/AppContext";

import ProtectedRoute from "./components/home/ProtectedRoute.jsx";

// Empleado
import ListarEmpleados from "./components/empleados/Index";
import CrearEmpleado from "./components/empleados/CrearEmpleado";
import MostrarEmpleado from "./components/empleados/MostrarEmpleado";
import EditarEmpleado from "./components/empleados/EditarEmpleado";

// Campañas
import ListarCampana from "./components/marketing/campanas/Index";
import CrearCampana from "./components/marketing/campanas/CrearCampana";
import EditarCampana from "./components/marketing/campanas/EditarCampana";
import MostrarCampana from "./components/marketing/campanas/MostrarCampana";
import EliminarCampana from "./components/marketing/campanas/EliminarCampana";

//Leads
import ListarLeads from "./components/ventas/leads/Index";
import CrearLead from "./components/ventas/leads/CrearLead";
import MostrarLead from "./components/ventas/leads/MostrarLead";
import EditarLead from "./components/ventas/leads/EditarLead";

//Contactos
import ListarContactos from "./components/ventas/contactos/Index";
import CrearContacto from "./components/ventas/contactos/CrearContacto";
import MostrarContacto from "./components/ventas/contactos/MostrarContacto";
import EditarContacto from "./components/ventas/contactos/EditarContacto";

//Organizaciones
import ListarOrganizaciones from "./components/ventas/organizaciones/Index";
import CrearOrganizacion from "./components/ventas/organizaciones/CrearOrganizacion";
import MostrarOrganizacion from "./components/ventas/organizaciones/MostrarOrganizacion";
import EditarOrganizacion from "./components/ventas/organizaciones/EditarOrganizacion";

//Oportunidades
import ListarOportunidades from "./components/ventas/oportunidades/Index";
import CrearOportunidad from "./components/ventas/oportunidades/CrearOportunidad";
import MostrarOportunidad from "./components/ventas/oportunidades/MostrarOportunidad";
import EditarOportunidad from "./components/ventas/oportunidades/EditarOportunidad.jsx";

//Casos
import ListarCaso from "./components/soporte/casos/Index";
import CrearCaso from "./components/soporte/casos/CrearCaso";
import EditarCaso from "./components/soporte/casos/EditarCaso";
import MostrarCaso from "./components/soporte/casos/MostrarCaso";
import EliminarCaso from "./components/soporte/casos/EliminarCaso";

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
import CrearCiclo from "./components/educacion/ciclos/CrearCiclo";
import ListarCiclos from "./components/educacion/ciclos/Index";
import MostrarCiclo from "./components/educacion/ciclos/MostrarCiclo.jsx";

// Profesores
import CrearProfesor from "./components/educacion/profesores/CrearProfesor";
import ListarProfesores from "./components/educacion/profesores/Index";
import MostrarProfesor from "./components/educacion/profesores/MostrarProfesor";
import EditarProfesor from "./components/educacion/profesores/EditarProfesor";
import EliminarProfesor from "./components/educacion/profesores/EliminarProfesor";

// Sedes
import CrearSede from "./components/educacion/sedes/CrearSede";
import ListarSedes from "./components/educacion/sedes/Index";
import MostrarSede from "./components/educacion/sedes/MostrarSede";
import EliminarSede from "./components/educacion/sedes/EliminarSede";

import CSAT from "./components/encuestas/CSAT.jsx";

import useToken from "../src/utils/useToken";

const initialState = { select: {} };

const MainApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setToken, usuario } = useToken();

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Router>
        <Routes>
          {/* Rutas Públicas */}
          <Route 
            path="/encuesta/:token" 
            element={<CSAT />} 
          />
          <Route path="*" element={<NotFound />} />
          
          {/* Rutas Privadas */}
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
            path="/login" 
            element={<Login setToken={setToken} />}   
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
            path="/admin/empleados/editar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EditarEmpleado />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/empleados/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <MostrarEmpleado />
              </ProtectedRoute>
            }
          />

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
          <Route
            exact
            path="/ventas/contactos/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <MostrarContacto />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/ventas/contactos/editar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EditarContacto />
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
          <Route
            exact
            path="/ventas/organizaciones/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <MostrarOrganizacion />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/ventas/organizaciones/editar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EditarOrganizacion />
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
          <Route
            exact
            path="/ventas/oportunidades/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <MostrarOportunidad />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ventas/oportunidades/editar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EditarOportunidad />
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
          <Route
            path="/educacion/ciclos/nuevo"
            element={
              <ProtectedRoute usuario={usuario}>
                <CrearCiclo />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/educacion/ciclos"
            element={
              <ProtectedRoute usuario={usuario}>
                <ListarCiclos />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/educacion/ciclos/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <MostrarCiclo />
              </ProtectedRoute>
            }
          />

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
          <Route
            path="/educacion/profesores/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <MostrarProfesor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/educacion/profesores/editar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EditarProfesor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/educacion/profesores/eliminar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EliminarProfesor />
              </ProtectedRoute>
            }
          />

          {/* Sedes */}
          <Route
            exact
            path="/educacion/sedes"
            element={
              <ProtectedRoute usuario={usuario}>
                <ListarSedes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/educacion/sedes/nuevo"
            element={
              <ProtectedRoute usuario={usuario}>
                <CrearSede />
              </ProtectedRoute>
            }
          />
          <Route
            path="/educacion/sedes/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <MostrarSede />
              </ProtectedRoute>
            }
          />
          <Route path="/educacion/sedes/eliminar/:id"
            element={
              <ProtectedRoute usuario={usuario}>
                <EliminarSede />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default MainApp;
