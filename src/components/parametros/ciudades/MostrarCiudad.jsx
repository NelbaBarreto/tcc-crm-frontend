import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView, DateFormat } from "../../formulario/Componentes";
import { CircularProgress } from "@mui/material";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getCiudad } from "../../../api/ciudades";

const DatosCiudad = ({ ciudad = {} }) => {
  return (
    <Seccion titulo={ciudad.nombre}>
      <div className="columns">
        <div className="column">
          <TextView label="Nombre" value={ciudad.nombre} />
        </div>
        <div className="column">
          <TextView label="País" value={ciudad.pais.nombre} />
        </div>
        <div className="column">
          <DateFormat label="Fecha de Creación" value={ciudad.fec_insercion} />
        </div>
      </div>

    </Seccion>
  );
}

const MostrarCiudad = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: ciudad,
    isLoading
  } = useQuery(["ciudad", id], () => getCiudad(id));

  return (
    <section className="section w-full m-auto">
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} /> : <DatosCiudad ciudad={ciudad} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarCiudad;