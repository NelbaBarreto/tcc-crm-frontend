import React from "react";
import Seccion from "../../formulario/Seccion";
import { DateFormat } from "../../formulario/Componentes";
import { TextView } from "../../formulario/Componentes";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getCurso } from "../../../api/cursos";
import { CircularProgress } from "@mui/material";

const DatosCurso = ({ curso = {} }) => {
  return (
    <Seccion titulo={curso.nombre}>
      <div className="columns">
        <div className="column">
          <TextView label="Descripción" value={curso.descripcion} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <DateFormat label="Fecha de Creación" value={curso.fec_insercion} />
        </div>
        <div className="column">
          <TextView label="Usuario Creación" value={curso.usu_insercion} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <DateFormat label="Fecha de Modificación" value={curso.fec_insercion} />
        </div>
        <div className="column">
          <TextView label="Usuario Modificación" value={curso.usu_modificacion} />
        </div>
      </div>
    </Seccion>
  );
}

const MostrarCurso = () => {
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
          <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosCurso curso={curso} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarCurso;