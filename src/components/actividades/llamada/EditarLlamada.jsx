import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { CircularProgress } from "@mui/material";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { getTipos, getEstados, editLlamadas, getLlamada } from "../../../api/llamadas";
import { getLeads } from "../../../api/leads";
import { getContactos } from "../../../api/contactos";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Dropdown, Input, TextArea, Datepicker } from "../../formulario/Componentes";

const LLAMADA = "llamada";

const DatosLlamada = ({ llamada = {}, dispatch, select = {} }) => {
  const {
    data: tipos,
  } = useQuery(["tipos"], getTipos);

  const {
    data: estados,
  } = useQuery(["estados"], getEstados);

  const {
    data: leads,
    leadsLoading
  } = useQuery(["leads"], getLeads);

  const {
    data: contactos,
    contactosLoading
  } = useQuery(["contactos"], getContactos);

  const opcionesLeads = leadsLoading || !leads ? [] :
    leads.map(lead => ({ value: lead.lead_id, label: `${lead.lead_id}-${lead.persona.nombre}` }));

  const opcionesContactos = contactosLoading || !contactos ? [] :
    contactos.map(contacto => ({ value: contacto.contacto_id, label: `${contacto.contacto_id}-${contacto.persona.nombre}` }));

  return (
    <Seccion titulo="Datos de la Llamada">
      <div className="columns is-vcentered">
        <div className="column">
          <Input
            label="Asunto*"
            name="asunto"
            value={llamada?.asunto || ""}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, LLAMADA)}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Tipo*"
            options={tipos}
            value={select.tipo}
            onChange={e => {
              handleDispatch(dispatch, "tipo", e?.value, LLAMADA);
              handleDispatch(dispatch, "tipo", e, "select")
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Estado*"
            value={select.estado}
            options={estados}
            onChange={e => {
              handleDispatch(dispatch, "estado", e?.value, LLAMADA);
              handleDispatch(dispatch, "estado", e, "select")
            }}
          />
        </div>
      </div>
      <div className="columns is-desktop">
        <div className="column">
          <Dropdown
            label="Lead"
            options={opcionesLeads}
            value={select.lead}
            onChange={e => {
              handleDispatch(dispatch, "lead_id", e?.value, LLAMADA);
              handleDispatch(dispatch, "lead", e, "select")
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Contacto"
            options={opcionesContactos}
            value={select.contacto}
            onChange={e => {
              handleDispatch(dispatch, "contacto_id", e?.value, LLAMADA);
              handleDispatch(dispatch, "contacto", e, "select")
            }}
          />
        </div>
      </div>
      <div className="columns is-desktop">
        <div className="column">
          <Datepicker
            label="Fecha de Inicio*"
            selected={llamada?.fec_inicio || ""}
            onChange={fecha => handleDispatch(dispatch, "fec_inicio", fecha, LLAMADA)}
          />
        </div>
        <div className="column">
          <TextArea
            label="Descripción"
            name="descripcion"
            value={llamada?.descripcion || ""}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, LLAMADA)}
          />
        </div>
      </div>
    </Seccion >

  )
};

const EditarLlamada = () => {
  const { state: { llamada, select }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const [enabled, setEnabled] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: currentLlamada,
    isFetching,
  } = useQuery(["llamada", id], () => getLlamada(id));

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  useEffect(() => {
    if (!isFetching && enabled) {
      setEnabled(false);
      handleDispatchEdit(dispatch, currentLlamada, LLAMADA);
      handleDispatchEdit(dispatch, {
        estado: { label: currentLlamada.estado, value: currentLlamada.estado },
        tipo: { label: currentLlamada.tipo, value: currentLlamada.tipo },
        lead: currentLlamada.contacto ?
          { value: currentLlamada.lead?.lead_id, label: `${currentLlamada.lead?.lead_id}-${currentLlamada.lead?.persona.nombre}` } : "",
        contacto: currentLlamada.contacto ?
          { value: currentLlamada.contacto?.contacto_id, label: `${currentLlamada.contacto?.contacto_id}-${currentLlamada.contacto?.persona.nombre}` } : "",
      }, "select");
    }
  }, [isFetching]);

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await editLlamadas(llamada.llamada_id, { ...llamada });
      setAction({ saving: false, error: false, message: "Llamada editada exitosamente." });
      setTimeout(() => navigate("/actividades/llamadas"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      {isFetching ?
        <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <section className="section w-full m-auto">
          <Titulo1>
            Editar Llamada
          </Titulo1>
          {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
          <form>
            <DatosLlamada
              llamada={llamada}
              dispatch={dispatch}
              select={select}
            />
            <Guardar
              saving={action.saving}
              guardar={crear}
            />
            <Volver
              navigate={navigate}
            />
          </form>
        </section>}
    </div>
  )

};

export default EditarLlamada;