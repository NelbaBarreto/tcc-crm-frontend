import React, { useState, useReducer } from "react";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import CrearPersona from "../../personas/CrearPersona";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown } from "../../formulario/Componentes";
import { createContacto } from "../../../api/contactos";
import { reducer } from "../../formulario/reducerFormularios.js";
import { getOrganizacion } from "../../../api/organizaciones";
import { getCampanas } from "../../../api/campanas";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

const DatosContacto = ({ onChange }) => {
  const [select, setSelect] = useState({ origen: "", campana: "", organizacion: "" });

  const {
    data: organizaciones,
    organizacionesLoading
  } = useQuery(["organizaciones"], getOrganizacion);
  
  const {
    data: campanas,
    campanasLoading
  } = useQuery(["campanas"], getCampanas);

  const opcionesOrganizaciones = organizacionesLoading || !organizaciones ? [] :
    organizaciones.map(organizacion => ({ value: organizacion.organizacion_id, label: organizacion.nombre }));

  const opcionesCampanas = campanasLoading || !campanas ? [] :
    campanas.map(campana => ({ value: campana.campana_id, label: campana.nombre }));

  return (
    <Seccion titulo="Datos del Contacto">
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Campaña"
            value={select.campana}
            options={opcionesCampanas}
            onChange={e => { onChange(e, "campana_id", e?.value); setSelect({ ...select, campana: e }) }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Origen del Lead"
            value={select.origen}
            onChange={e => { onChange(e, "origen", e.value); setSelect({ ...select, origen: e }) }}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column is-half">
          <Dropdown
            label="Organización"
            value={select.organizacion}
            options={opcionesOrganizaciones}
            onChange={e => { onChange(e, "organizacion_id", e.value); setSelect({ ...select, organizacion: e }) }}
          />
        </div>
      </div>
    </Seccion>
  );
};

const CrearContacto = () => {
  const [state, dispatch] = useReducer(reducer, {});
  const [persona, setPersona] = useState({});
  const [action, setAction] = useState({});
  const navigate = useNavigate();

  const handleDispatch = (e, name, value = " ") => {
    dispatch({
      type: "FORM_UPDATED",
      payload: { name: e?.target?.name || name, value: e?.target?.value || value, object: "contacto" }
    })
  }

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createContacto({ ...state.lead, persona });
      setAction({ saving: false, error: false, message: "Contacto creado exitosamente." });
      setTimeout(() => navigate("/ventas/contactos"), 3000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Contacto
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <CrearPersona persona={persona} setPersona={setPersona} />
          <DatosContacto lead={state.lead} onChange={handleDispatch} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearContacto;