import React from "react";
import Seccion from "../../formulario/Seccion";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getCurso } from "../../../api/cursos";
import { CircularProgress } from "@mui/material";

const DatosCurso = ({ curso, navigate }) => {
  return (
    <Seccion titulo="Datos del Curso">
      <ul className="list-none">
        <li><label className="label">Nombre: </label>{curso.nombre}</li>
        <li><label className="label">Descripción: </label>{curso.descripcion}</li>
      </ul>
      <div className="field mt-3">
        <div className="control">
          <button
            type="submit"
            className="button font-semibold shadow-lg text-deep-purple-800 hover:text-white focus:text-white
              hover:bg-deep-purple-700 bg-deep-purple-100"
            onClick={() => navigate(`/educacion/cursos/${curso.curso_id}/ciclos/nuevo`)}
          >
            <span>Crear Ciclo</span>
            <span className="icon is-small">
              <FontAwesomeIcon icon={solid("arrows-spin")} />
            </span>
          </button>
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