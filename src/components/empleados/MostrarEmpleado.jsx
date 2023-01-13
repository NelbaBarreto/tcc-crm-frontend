import React from "react";
import DatosPersona from "../personas/DatosPersona";
import { Volver } from "../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getEmpleado } from "../../api/empleados";
import { CircularProgress } from "@mui/material";
import { DateFormat } from "../formulario/Componentes";

const DatosEmpleado = ({ empleado }) => {
  return (

    <div className="md:flex no-wrap md:-mx-2 ">
      <div className="w-full md:w-3/12 md:mx-2">
        <div className="bg-white p-4 rounded-md shadow-lg mt-2 border-t-4 border-purple-800">
          <div className="image overflow-hidden">
            <img className="h-auto w-full mx-auto"
              src="https://images.squarespace-cdn.com/content/v1/54b7b93ce4b0a3e130d5d232/1519987020970-8IQ7F6Z61LLBCX85A65S/icon.png?format=1000w"
              alt="" />
          </div>
          <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{empleado.persona.nombre}</h1>
          <h3 className="text-gray-600 font-lg text-semibold leading-6">{empleado.cargo}</h3>
          <ul
            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li className="flex items-center py-3">
              <span>Estado</span>
              <span className="ml-auto">
                <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">{empleado.activo ? "Activo" : "Inactivo"}</span>
              </span>
            </li>
            <li className="flex items-center py-3">
              <span>Fecha de Creación</span>
              <DateFormat className="ml-auto" value={empleado.fec_insercion} />
            </li>
          </ul>
        </div>
      </div>
      <DatosPersona persona={empleado.persona} />
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
          <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosEmpleado empleado={empleado} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarEmpleado;