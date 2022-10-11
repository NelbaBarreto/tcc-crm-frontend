import React from "react";
import Seccion from "../../formulario/Seccion";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getCurso } from "../../../api/cursos";
import { CircularProgress } from "@mui/material";

const DatosCurso = ({ curso }) => {
  return (
  <Seccion titulo="Datos del Curso">
    <ul className="list-none">
      <li><label className="label">Nombre: </label>{curso.nombre}</li>
      <li><label className="label">Descripción: </label>{curso.descripcion}</li>
    </ul>
  </Seccion>
  );
}

const MostrarEmpleado = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: curso,
    isLoading
  } = useQuery(["curso", id], () => getCurso(id));

  return (
    <section className="section w-full m-auto">
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} /> : <DatosCurso curso={curso} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarEmpleado;