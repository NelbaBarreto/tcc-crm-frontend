import React from "react";
import Seccion from "../formulario/Seccion";
import { TextView } from "../formulario/Componentes";
import { Volver } from "../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getEmpleado } from "../../api/profesores";
import { CircularProgress } from "@mui/material";
import { DateFormat } from "../formulario/Componentes";
import DatosPersona from "../personas/DatosPersona";

const DatosProfesor = ({ profesor }) => {
  return (
    <>
      <DatosPersona
        persona={profesor.persona}
      />
      <Seccion titulo="Datos del Profesor">
        <div className="columns">
          <div className="column">
            <DateFormat label="Fecha de Creación" value={profesor.fec_insercion} />
          </div>
          <div className="column">
            <TextView label="Usuario Creación" value={profesor.usu_insercion} />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <DateFormat label="Fecha de Modificación" value={profesor.fec_insercion} />
          </div>
          <div className="column">
            <TextView label="Usuario Modificación" value={profesor.usu_modificacion} />
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
    data: profesor,
    isLoading
  } = useQuery(["profesor", id], () => getEmpleado(id));

  return (
    <section className="section w-full m-auto">
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosProfesor profesor={profesor} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarEmpleado;