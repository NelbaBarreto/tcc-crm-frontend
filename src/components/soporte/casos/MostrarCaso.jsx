import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView, DateFormat } from "../../formulario/Componentes";
import { CircularProgress } from "@mui/material";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getCaso } from "../../../api/casos";

const DatosCaso = ({ caso = {} }) => {
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
          <TextView label="Usuario Asignado" value={caso.usuario?.nom_usuario} />
        </div>
        <div className="column">
          <DateFormat label="Fecha de Creación" value={caso.fec_insercion} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Solución" value={caso.solucion} />
        </div>
        <div className="column">
          <TextView label="Descripción" value={caso.descripcion} />
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
          <CircularProgress size={24} /> : <DatosCaso caso={caso} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarCaso;