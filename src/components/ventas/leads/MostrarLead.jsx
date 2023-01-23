import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView } from "../../formulario/Componentes";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getLead } from "../../../api/leads";
import { CircularProgress } from "@mui/material";
import DatosPersona from "../../personas/DatosPersona";

const DatosLead = ({ lead }) => {
  return (
    <>
      <DatosPersona
        persona={lead.persona}
      />
      <Seccion titulo="Datos del Lead">
        <div className="columns">
          <div className="column">
            <TextView label="Interés/Curso" value={lead.curso.nombre} />
          </div>
          <div className="column">
            <TextView label="Usuario Asignado" value={lead.usu_asignado?.nom_usuario} />
          </div>
        </div>
      </Seccion>
    </>
  );
}

const MostrarLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: lead,
    isLoading
  } = useQuery(["lead", id], () => getLead(id));

  return (
    <section className="section w-full m-auto">
      <div className="buttons has-addons">
        <button
          className="button font-bold is-active"
        >
          Intereses
        </button>
        <button
          className="button font-bold"
        >
          Casos
        </button>
        <button
          className="button font-bold"
        >
          Llamadas
        </button>
        <button
          className="button font-bold"
        >
          Tareas
        </button>
      </div>
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosLead lead={lead} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarLead;