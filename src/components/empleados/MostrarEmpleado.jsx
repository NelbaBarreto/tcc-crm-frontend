import React from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getEmpleado } from "../../api/empleados";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MostrarEmpleado = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: empleado,
    isLoading
  } = useQuery(["empleado", id], () => getEmpleado(id));

  return (
    <section className="section w-full m-auto">
      <h1 className="title is-3 text-center">{empleado.persona.nombre}</h1>
      <button className="button font-semibold shadow-lg text-white hover:text-white hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700"
        onClick={() => navigate(-1)}
      >
        <span>Volver</span>
        <span class="icon is-small">
          <FontAwesomeIcon icon={solid("arrow-left")} />
        </span>
      </button>
    </section>
  );
}

export default MostrarEmpleado;