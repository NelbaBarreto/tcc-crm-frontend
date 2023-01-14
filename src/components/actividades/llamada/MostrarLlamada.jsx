import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView, DateFormat } from "../../formulario/Componentes";
import { CircularProgress } from "@mui/material";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getLlamada } from "../../../api/llamadas";
import { format } from "date-fns";

const DatosLlamada = ({ llamada = {} }) => {
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