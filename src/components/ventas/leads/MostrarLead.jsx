import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView } from "../../formulario/Componentes";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getLead } from "../../../api/leads";
import { CircularProgress } from "@mui/material";
import DatosPersona from "../../personas/DatosPersona";
import ListarTareas from "../../actividades/tarea/Index";
import ListarLlamadas from "../../actividades/llamada/Index";
import ListarCasos from "../../soporte/casos/Index";
import Tabs from "../../Tabs";

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

const MostrarLead = ({ lead_id }) => {
  const navigate = useNavigate();

  const {
    data: lead,
    isLoading
  } = useQuery(["lead", lead_id], () => getLead(lead_id));

  return (
    <section className="w-full m-auto">
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosLead lead={lead} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

const Index = () => {
  const { id } = useParams();

  const tabList = [
    {
      name: "Lead",
      content: <MostrarLead lead_id={id} />
    },
    {
      name: "Casos",
      content: <ListarCasos lead_id={id} />
    },
    {
      name: "Llamadas",
      content: <ListarLlamadas lead_id={id} />
    },
    {
      name: "Tareas",
      content: <ListarTareas lead_id={id}/>
    },
  ];

  return (
    <Tabs tabList={tabList} />
  )
}

export default Index;