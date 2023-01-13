import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView } from "../../formulario/Componentes";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getLead } from "../../../api/leads";
import { CircularProgress } from "@mui/material";

const DatosLead = ({ lead }) => {
  return (
    <Seccion titulo="Datos del lead">
      <div className="columns">
        <div className="column">
          <TextView label="Nombre" value={lead.nombre} />
        </div>
        <div className="column">
          <TextView label="Descripción" value={lead.descripcion} />
        </div>
      </div>
    </Seccion>
  );
}

const MostrarEmpleado = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: lead,
    isLoading
  } = useQuery(["lead", id], () => getLead(id));

  return (
    <section className="section w-full m-auto">
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosLead lead={lead} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarEmpleado;