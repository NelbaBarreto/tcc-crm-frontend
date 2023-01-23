import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView } from "../../formulario/Componentes";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getContacto } from "../../../api/contactos";
import { CircularProgress } from "@mui/material";
import DatosPersona from "../../personas/DatosPersona";

const DatosContacto = ({ contacto }) => {
  return (
    <>
      <DatosPersona
        persona={contacto.persona}
      />
      <Seccion titulo="Datos del Contacto">
        <div className="columns">
          <div className="column">
            <TextView label="Origen" value={contacto.origen} />
          </div>
          <div className="column">
            <TextView label="Organización" value={contacto.organizacion?.persona?.nombre} />
          </div>
        </div>
      </Seccion>
    </>
  );
}

const MostrarContacto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: contacto,
    isLoading
  } = useQuery(["contacto", id], () => getContacto(id));

  return (
    <section className="section w-full m-auto">
      <div className="buttons has-addons">
        <button
          className="button font-bold is-active"
        >
          Intereses
        </button>
        <button
          className="button font-bold"
        >
          Casos
        </button>
        <button
          className="button font-bold"
        >
          Llamadas
        </button>
        <button
          className="button font-bold"
        >
          Tareas
        </button>
      </div>
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosContacto contacto={contacto} navigate={navigate} />
        }
      </div>
      <Volver navigate={navigate} />
    </section>
  );
}

export default MostrarContacto;