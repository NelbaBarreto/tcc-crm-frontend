import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView } from "../../formulario/Componentes";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getOportunidad } from "../../../api/oportunidades";
import { CircularProgress } from "@mui/material";

const DatosOportunidad = ({ oportunidad }) => {
  return (
    <Seccion titulo="Datos de la Oportunidad">
      <div className="columns">
        <div className="column">
          <TextView label="Nombre" value={oportunidad.nombre} />
        </div>
        <div className="column">
          <TextView label="Contacto" value={oportunidad.contacto?.persona?.nombre} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Interés/Curso" value={oportunidad.curso?.nombre} />
        </div>
        <div className="column">
          <TextView label="Usuario Asignado" value={oportunidad.usuario?.nom_usuario} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Estado" value={oportunidad.curso.nombre} />
        </div>
        <div className="column">
          <TextView label="Valor" value={oportunidad.valor} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Campaña" value={oportunidad.campana?.nombre} />
        </div>
        <div className="column">
          <TextView label="Descripción" value={oportunidad.descripcion} />
        </div>
      </div>
    </Seccion>
  );
}

const MostrarOportunidad = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: oportunidad,
    isLoading
  } = useQuery(["oportunidad", id], () => getOportunidad(id));

  return (
    <section className="section w-full m-auto">
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosOportunidad oportunidad={oportunidad} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarOportunidad;