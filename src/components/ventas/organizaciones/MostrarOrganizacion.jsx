import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView } from "../../formulario/Componentes";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getOrganizacion } from "../../../api/organizaciones";
import { CircularProgress } from "@mui/material";
import DatosPersona from "../../personas/DatosPersona";

const DatosOrganizacion = ({ organizacion }) => {
  return (
    <>
      <DatosPersona
        persona={organizacion?.persona}
      />
      <Seccion titulo="Datos de la Organización">
        <div className="columns">
          <div className="column">
            <TextView label="Website" value={organizacion.website} />
          </div>
          <div className="column">
            <TextView label="Descripción" value={organizacion.descripcion} />
          </div>
        </div>
      </Seccion>
    </>
  );
}

const MostrarOrganizacion = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: organizacion,
    isLoading
  } = useQuery(["organizacion", id], () => getOrganizacion(id));

  return (
    <section className="section w-full m-auto">
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosOrganizacion organizacion={organizacion} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarOrganizacion;