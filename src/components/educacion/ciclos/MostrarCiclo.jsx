import React from "react";
import Seccion from "../../formulario/Seccion";
import { DateFormat } from "../../formulario/Componentes";
import { TextView } from "../../formulario/Componentes";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getCiclo } from "../../../api/ciclos";
import { CircularProgress } from "@mui/material";

const DatosCiclo = ({ ciclo = {} }) => {
  return (
    <Seccion titulo={ciclo.codigo}>
      <div className="columns">
        <div className="column">
          <DateFormat label="Fecha de Inicio" value={ciclo.fec_inicio} dateFormat="dd/MM/yyyy" />
        </div>
        <div className="column">
          <DateFormat label="Fecha de Fin" value={ciclo.fec_fin} dateFormat="dd/MM/yyyy" />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextView label="Nivel" value={ciclo.nivel} />
        </div>
        <div className="column">
          <TextView label="Información Adicional" value={ciclo.detalles} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <DateFormat label="Fecha de Creación" value={ciclo.fec_insercion} />
        </div>
        <div className="column">
          <TextView label="Usuario Creación" value={ciclo.usu_insercion} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <DateFormat label="Fecha de Modificación" value={ciclo.fec_insercion} />
        </div>
        <div className="column">
          <TextView label="Usuario Modificación" value={ciclo.usu_modificacion} />
        </div>
      </div>
    </Seccion>
  );
}

const MostrarCiclo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: ciclo,
    isLoading
  } = useQuery(["ciclo", id], () => getCiclo(id));

  return (
    <section className="section w-full m-auto">
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosCiclo ciclo={ciclo} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarCiclo;