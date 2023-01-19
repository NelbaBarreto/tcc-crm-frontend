import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView, DateFormat } from "../../formulario/Componentes";
import { CircularProgress } from "@mui/material";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getSede } from "../../../api/sedes";

const DatosSede = ({ sede = {} }) => {
  let estado_principal = sede.direccion.principal
  estado_principal === true ? estado_principal = "Si" : estado_principal = "No";


  return (
    <Seccion titulo={sede.nombre}>
      <div className="columns">
        <div className="column">
          <TextView label="Tipo dirección" value={sede.direccion.tipo} />
        </div>
        <div className="column">
          <DateFormat label="Fecha de Creación" value={sede.fec_insercion} />
        </div>
      </div>

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
          <TextView label="País" value={sede.direccion?.ciudad?.pais?.nombre} />
        </div>
        <div className="column">
          <TextView label="Ciudad" value={sede.direccion?.ciudad?.nombre} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Principal" value={estado_principal} />
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