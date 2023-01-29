import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView, DateFormat } from "../../formulario/Componentes";
import { CircularProgress } from "@mui/material";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getCaso } from "../../../api/casos";
import { getLead } from "../../../api/leads";
import { getContacto } from "../../../api/contactos";

const DatosCaso = ({ caso = {} }) => {
  const { id } = useParams();

  const {
    data: lead,
  } = useQuery(["lead", caso.lead_id], () => getLead(caso.lead_id));

  const {
    data: contacto,
  } = useQuery(["contacto", caso.contacto_id], () => getContacto(caso.contacto_id));
  return (
    <Seccion titulo={caso.asunto}>
      <div className="columns">
        <div className="column">
          <TextView label="Prioridad" value={caso.prioridad} />
        </div>
        <div className="column">
          <TextView label="Estado" value={caso.estado} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Tipo" value={caso.tipo} />
        </div>
        <div className="column">
          <TextView label="Origen" value={caso.origen} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Lead" value={caso.lead?.persona.nombre} />
        </div>
        <div className="column">
          <TextView label="Contacto" value={caso.contacto?.persona.nombre} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Usuario Asignado" value={caso.usuario?.nom_usuario} />
        </div>
        <div className="column">
          <DateFormat label="Fecha de Creación" value={caso.fec_insercion} />
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
          <TextView label="Solución" value={caso.solucion} />
        </div>
        <div className="column">
          <TextView label="Solución" value={caso.solucion} />
        </div>
      </div>
    </Seccion>
  );
}

const MostrarCaso = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: caso,
    isLoading
  } = useQuery(["caso", id], () => getCaso(id));

  return (
    <section className="section w-full m-auto">
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosCaso caso={caso} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarCaso;