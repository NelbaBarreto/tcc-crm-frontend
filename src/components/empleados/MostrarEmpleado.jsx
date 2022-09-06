import React from "react";
import PersonaCard from "../personas/PersonaCard";
import Volver from "../Volver";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getEmpleado } from "../../api/empleados";
import { CircularProgress } from "@mui/material";

const Empleado = ({ empleado }) => {
  return (
    <div className="tile is-ancestor">
      <div className="tile is-vertical is-3">
        {/* Aside */}
        <PersonaCard persona={empleado.persona} />
      </div>
      <div className="tile is-parent">
        <div class="tile is-child box">
        </div>
      </div>
    </div>
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
          <CircularProgress size={24} /> : <Empleado empleado={empleado} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarEmpleado;