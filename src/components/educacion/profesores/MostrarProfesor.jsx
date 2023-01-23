import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView } from "../../formulario/Componentes";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getProfesor } from "../../../api/profesores";
import { CircularProgress } from "@mui/material";
import DatosPersona from "../../personas/DatosPersona";

const DatosProfesor = ({ profesor }) => {
  return (
    <DatosPersona
      persona={profesor.persona}
    />
  );
}

const MostrarProfesor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: profesor,
    isLoading
  } = useQuery(["profesor", id], () => getProfesor(id));

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

export default MostrarProfesor;