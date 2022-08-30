import React from "react";
import Volver from "../Volver";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getEmpleado } from "../../api/empleados";
import { Typography, CircularProgress } from "@mui/material";

const MostrarEmpleado = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: empleado,
    isLoading
  } = useQuery(["empleado", id], () => getEmpleado(id));

  return (
    <section className="section w-full m-auto">
      {isLoading ? 
        <CircularProgress size={24} /> : <Typography variant="h5">
          {empleado.persona.nombre}
        </Typography>
      }
      <Volver navigate={navigate}/>
    </section>
  );
}

export default MostrarEmpleado;