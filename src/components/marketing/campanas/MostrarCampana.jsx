import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView, DateFormat } from "../../formulario/Componentes";
import { CircularProgress } from "@mui/material";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getCampana } from "../../../api/campanas";

const DatosCampana = ({ campana = {} }) => {
  return (
    <Seccion titulo={campana.nombre}>
      <div className="columns">
        <div className="column">
          <TextView label="Nombre" value={campana.nombre} />
        </div>
        <div className="column">
          <DateFormat label="Fecha de Creación" value={campana.fec_insercion} />
        </div>
      </div>

      {/* <div className="columns">
        <div className="column">
          <TextView label="Fecha Fin" value={campana?.fec_fin} />
        </div>
        <div className="column">
          <TextView label="Fecha de Inicio" value={campana?.fec_inicio} />
        </div>
      </div> */}
      <div className="column">
        <TextView label="Descripción" value={campana.descripcion} />
      </div>
    </Seccion >
  );
}

const MostrarCampana = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: campana,
    isLoading
  } = useQuery(["campana", id], () => getCampana(id));

  return (
    <section className="section w-full m-auto">
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} /> : <DatosCampana campana={campana} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarCampana;