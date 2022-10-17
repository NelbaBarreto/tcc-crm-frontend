import React from "react";
import Seccion from "../../formulario/Seccion";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button1, TextView } from "../../formulario/Componentes";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getCurso } from "../../../api/cursos";
import { CircularProgress } from "@mui/material";

const DatosCurso = ({ curso, navigate }) => {
  return (
    <Seccion titulo="Datos del Curso">
      <div className="columns">
        <div className="column">
          <TextView label="Nombre" value={curso.nombre} />
        </div>
        <div className="column">
          <TextView label="Descripción" value={curso.descripcion} />
        </div>
      </div>
      <div className="field mt-3">
        <div className="control">
          <Button1
            onClick={() => navigate(`/educacion/cursos/${curso.curso_id}/ciclos/nuevo`)}
          >
            <span>Crear Ciclo</span>
            <span className="icon is-small">
              <FontAwesomeIcon icon={solid("arrows-spin")} />
            </span>
          </Button1>
        </div>
      </div>
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
          <CircularProgress size={24} /> : <DatosCurso curso={curso} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarEmpleado;