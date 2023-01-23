import React from "react";
import Seccion from "../formulario/Seccion";
import { TextView } from "../formulario/Componentes";
import { Volver } from "../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getEmpleado } from "../../api/empleados";
import { CircularProgress } from "@mui/material";
import DatosPersona from "../personas/DatosPersona";

const DatosEmpleado = ({ empleado }) => {
  return (
    <>
      <DatosPersona
        persona={empleado.persona}
      />
      <Seccion titulo="Datos del Lead">
        <div className="columns">
          <div className="column">
            <TextView label="Cargo" value={empleado.cargo} />
          </div>
          <div className="column">
            <TextView label="Activo" value={empleado.activo ? "Sí" : "No"} />
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <TextView label="Nombre de Usuario" value={empleado.usuario?.nom_usuario} />
          </div>
        </div>
      </Seccion>
    </>
  );
}

const MostrarEmpleado = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: empleado,
    isLoading
  } = useQuery(["empleado", id], () => getEmpleado(id));

  return (
    <section className="section w-full m-auto">
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosEmpleado empleado={empleado} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarEmpleado;