import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView } from "../../formulario/Componentes";
import { CircularProgress } from "@mui/material";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getTarea } from "../../../api/tareas";
import { format, parseISO } from "date-fns";

const DatosTarea = ({ tarea = {} }) => {
  return (
    <Seccion titulo={tarea.asunto}>
      <div className="columns">
        <div className="column">
          <TextView label="Asunto" value={tarea.asunto} />
        </div>
        <div className="column">
          <TextView label="Descripcion" value={tarea.descripcion} />
        </div>
      </div>

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
          <TextView label="Fecha de Inicio" value={tarea.fec_inicio} />
        </div>
        <div className="column">
          <TextView label="Fecha Fin" value={tarea.fec_fin} />
        </div>
      </div>
        
        <div className="column">
          <TextView label="Fecha de Creación" value={format(parseISO(tarea.fec_insercion), "dd/MM/yyyy hh:mm")} />
        </div>
      
    </Seccion>
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