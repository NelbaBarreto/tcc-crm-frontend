import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView, DateFormat } from "../../formulario/Componentes";
import { CircularProgress } from "@mui/material";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getCampana } from "../../../api/campanas";
import { format } from "date-fns";

const DatosCampana = ({ campana = {} }) => {
  return (
    <Seccion titulo={campana.nombre}>
      <div className="columns">
        <div className="column">
          <TextView label="Fecha de Inicio" value={format(campana?.fec_inicio, "dd/MM/yyyy hh:mm")} />
        </div>
        <div className="column">
          <TextView label="Fecha Fin" value={format(campana?.fec_fin, "dd/MM/yyyy hh:mm")} />
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <DateFormat label="Fecha de Creación" value={campana.fec_insercion} />
        </div>
        <div className="column">
          <TextView label="Descripción" value={campana.descripcion} />
        </div>
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
          <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosCampana campana={campana} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarCampana;