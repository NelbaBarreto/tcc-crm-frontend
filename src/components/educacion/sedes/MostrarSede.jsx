import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView, DateFormat } from "../../formulario/Componentes";
import { CircularProgress } from "@mui/material";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getSede } from "../../../api/sedes";

const DatosSede = ({ sede = {} }) => {
  return (
    <Seccion titulo={sede.nombre}>
      <div className="columns">
        <div className="column">
          <TextView label="Calle 1" value={sede.direccion.calle_1} />
        </div>
        <div className="column">
          <TextView label="Calle 2" value={sede.direccion.calle_2} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Código postal" value={sede.direccion?.cod_postal} />
        </div>
        <div className="column">
          <TextView label="Referencia" value={sede.direccion?.referencia} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <DateFormat label="Fecha de Creación" value={sede.fec_insercion} />
        </div>
        <div className="column">
          <TextView label="Usuario Creación" value={sede.usu_insercion} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <DateFormat label="Fecha de Modificación" value={sede.fec_insercion} />
        </div>
        <div className="column">
          <TextView label="Usuario Modificación" value={sede.usu_modificacion} />
        </div>
      </div>
    </Seccion >
  );
}

const MostrarSede = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: sede,
    isLoading
  } = useQuery(["sede", id], () => getSede(id));

  return (
    <section className="section w-full m-auto">
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosSede sede={sede} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarSede;