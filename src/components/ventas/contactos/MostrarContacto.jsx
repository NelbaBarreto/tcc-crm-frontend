import React from "react";
import Seccion from "../../formulario/Seccion";
import { TextView } from "../../formulario/Componentes";
import { Volver } from "../../formulario/Acciones";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getContacto } from "../../../api/contactos";
import { CircularProgress } from "@mui/material";
import DatosPersona from "../../personas/DatosPersona";
import ListarTareas from "../../actividades/tarea/Index";
import ListarLlamadas from "../../actividades/llamada/Index";
import ListarCasos from "../../soporte/casos/Index";
import ListarOportunidades from "../../ventas/oportunidades/Index";
import Tabs from "../../Tabs";

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
    <section className="w-full m-auto">
      <div className="mb-4">
        {isLoading ?
          <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <DatosContacto contacto={contacto} navigate={navigate} />
        }
      </div>
      <Volver 
        navigate={navigate}
      />
    </section>
  );
}

const Index = () => {
  const { id } = useParams();

  const tabList = [
    {
      name: "Contacto",
      content: <MostrarContacto contacto_id={id} />
    },
    {
      name: "Oportunidades",
      content: <ListarOportunidades contacto_id={id}/>
    },    
    {
      name: "Casos",
      content: <ListarCasos contacto_id={id} />
    },
    {
      name: "Llamadas",
      content: <ListarLlamadas contacto_id={id} />
    },
    {
      name: "Tareas",
      content: <ListarTareas contacto_id={id}/>
    },
  ];

  return (
    <Tabs tabList={tabList} />
  )
}

export default Index;