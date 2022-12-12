import React from "react";
import Tabs from "../formulario/Tabs";
import Seccion from "../formulario/Seccion";
import PersonaCard from "../personas/PersonaCard";
import { Volver } from "../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getEmpleado } from "../../api/empleados";
import { CircularProgress } from "@mui/material";
import { TextView } from "../formulario/Componentes";

const DatosEmpleado = ({ empleado }) => {
  return (
    <PersonaCard persona={empleado.persona} />
    // <div className="tile is-ancestor">
    //   <div className="tile is-vertical is-3">
    //     {/* Aside */}
    //     <PersonaCard persona={empleado.persona} />
    //   </div>
    //   <div className="tile is-parent">
    //     <div className="tile is-child box">
    //     </div>
    //   </div>
    // </div>
  )
};

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
          <CircularProgress size={24} /> : <DatosEmpleado empleado={empleado} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarEmpleado;