import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView, DateFormat } from "../../formulario/Componentes";
import { CircularProgress } from "@mui/material";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getTarea } from "../../../api/tareas";
import { format } from "date-fns";

const DatosTarea = ({ tarea = {} }) => {
  return (
    <Seccion titulo={tarea.asunto}>
      <div className="columns">
        <div className="column">
          <TextView label="Estado" value={tarea.estado} />
        </div>
        <div className="column">
          <TextView label="Prioridad" value={tarea.prioridad} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Fecha de Inicio" value={tarea.fec_inicio ? format(tarea.fec_inicio, "dd/MM/yyyy") : ""} />
        </div>
        <div className="column">
          <TextView label="Fecha Fin" value={tarea.fec_fin ? format(tarea.fec_fin, "dd/MM/yyyy") : ""} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Descripcion" value={tarea.descripcion} />
        </div>
        <div className="column">
          <DateFormat label="Fecha de Creación" value={tarea.fec_insercion} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Usuario Asignado" value={tarea.usuario.nom_usuario} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Lead" value={tarea.lead?.persona.nombre} />
        </div>
        <div className="column">
          <TextView label="Contacto" value={tarea.contacto?.persona.nombre} />
        </div>
      </div>
    </Seccion >
  );
}

const MostrarTarea = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: tarea,
    isLoading
  } = useQuery(["tarea", id], () => getTarea(id));

  return (
    <section className="section w-full m-auto">
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} /> : <DatosTarea tarea={tarea} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarTarea;