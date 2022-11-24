import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView, DateFormat } from "../../formulario/Componentes";
import { CircularProgress } from "@mui/material";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getPais } from "../../../api/paises";

const DatosPais = ({ pais = {} }) => {
  return (
    <Seccion titulo={pais.nombre}>
      <div className="columns">
        <div className="column">
          <TextView label="Nombre" value={pais.nombre} />
        </div>
        <div className="column">
          <TextView label="Nombre Corto" value={pais.nom_corto} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Codigo Telefono" value={pais.cod_telefono} />
        </div>

        <div className="column">
          <DateFormat label="Fecha de Creación" value={pais.fec_insercion} />
        </div>
      </div>
    </Seccion>
  );
}

const MostrarPais = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: pais,
    isLoading
  } = useQuery(["pais", id], () => getPais(id));

  return (
    <section className="section w-full m-auto">
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} /> : <DatosPais pais={pais} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarPais;