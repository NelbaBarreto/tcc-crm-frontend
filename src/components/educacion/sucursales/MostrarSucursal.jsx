import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView, DateFormat } from "../../formulario/Componentes";
import { CircularProgress } from "@mui/material";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getSucursal } from "../../../api/sucursales";

const DatosSucursal = ({ sucursal = {} }) => {
  let estado_principal = sucursal.direccion.principal
  estado_principal === true ? estado_principal = "Si" : estado_principal = "No";


  return (
    <Seccion titulo={sucursal.nombre}>
      <div className="columns">
        <div className="column">
          <TextView label="Tipo dirección" value={sucursal.direccion.tipo} />
        </div>
        <div className="column">
          <DateFormat label="Fecha de Creación" value={sucursal.fec_insercion} />
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <TextView label="Calle 1" value={sucursal.direccion.calle_1} />
        </div>
        <div className="column">
          <TextView label="Calle 2" value={sucursal.direccion.calle_2} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Código postal" value={sucursal.direccion?.cod_postal} />
        </div>
        <div className="column">
          <TextView label="Referencia" value={sucursal.direccion?.referencia} />
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <TextView label="País" value={sucursal.direccion?.ciudad?.pais?.nombre} />
        </div>
        <div className="column">
          <TextView label="Ciudad" value={sucursal.direccion?.ciudad?.nombre} />
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

const MostrarSucursal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: sucursal,
    isLoading
  } = useQuery(["sucursal", id], () => getSucursal(id));

  return (
    <section className="section w-full m-auto">
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosSucursal sucursal={sucursal} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarSucursal;