import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView, DateFormat } from "../../formulario/Componentes";
import { CircularProgress } from "@mui/material";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getLlamada } from "../../../api/llamadas";
import { getLead } from "../../../api/leads";
import { getContacto } from "../../../api/contactos";
import { format } from "date-fns";

const DatosLlamada = ({ llamada = {} }) => {
  const { id } = useParams();

  const {
    data: lead,
  } = useQuery(["lead", llamada.lead_id], () => getLead(llamada.lead_id));

  const {
    data: contacto,
  } = useQuery(["contacto", llamada.contacto_id], () => getContacto(llamada.contacto_id));

  return (
    <Seccion titulo={llamada.asunto}>
      <div className="columns">
        <div className="column">
          <TextView label="Estado" value={llamada.estado} />
        </div>
        <div className="column">
          <DateFormat label="Fecha de Creación" value={llamada.fec_insercion} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Tipo de llamada" value={llamada.tipo} />
        </div>
        <div className="column">
          <TextView label="Descripción" value={llamada.descripcion} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Contacto" value={`${contacto.contacto_id}-${contacto.persona.nombre}`} />
        </div>
        <div className="column">
          <TextView label="Lead" value={`${lead.lead_id}-${lead.persona.nombre}`} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Fecha de Inicio" value={format(llamada.fec_inicio, "dd/MM/yyyy hh:mm")} />
        </div>
      </div>
    </Seccion>
  );
}

const MostrarLlamada = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: llamada,
    isLoading
  } = useQuery(["llamada", id], () => getLlamada(id));

  return (
    <section className="section w-full m-auto">
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosLlamada llamada={llamada} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarLlamada;