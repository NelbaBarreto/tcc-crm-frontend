import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { CircularProgress } from "@mui/material";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { getLeads } from "../../../api/leads";
import { getContactos } from "../../../api/contactos";
import { Dropdown, Input, TextArea } from "../../formulario/Componentes";
import { getUsuarios } from "../../../api/usuarios";
import { editCaso, getOrigenes, getPrioridades, getEstados, getTipos, getCaso } from "../../../api/casos";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const CASO = "caso";

const DatosCaso = ({ caso, dispatch, select = {} }) => {
  const {
    data: usuarios,
    usuariosLoading
  } = useQuery(["usuarios"], getUsuarios);

  const {
    data: origenes,
  } = useQuery(["origenes"], getOrigenes);

  const {
    data: prioridades,
  } = useQuery(["prioridades"], getPrioridades);

  const {
    data: estados,
  } = useQuery(["estados"], getEstados);

  const {
    data: tipos,
  } = useQuery(["tipos"], getTipos);

  const {
    data: leads,
    leadsLoading
  } = useQuery(["leads"], getLeads);

  const {
    data: contactos,
    contactosLoading
  } = useQuery(["contactos"], getContactos);

  const opcionesUsuarios = usuariosLoading || !usuarios ? [] :
    usuarios.map(usuario => ({ value: usuario.usuario_id, label: usuario.nom_usuario }));

  const opcionesLeads = leadsLoading || !leads ? [] :
    leads.map(lead => ({ value: lead.lead_id, label: `${lead.lead_id}-${lead.persona.nombre}` }));

  const opcionesContactos = contactosLoading || !contactos ? [] :
    contactos.map(contacto => ({ value: contacto.contacto_id, label: `${contacto.contacto_id}-${contacto.persona.nombre}` }));


  return (
    <Seccion titulo="Datos del Caso">
      <Input
        label="Asunto*"
        name="asunto"
        value={caso?.asunto || ""}
        onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, CASO)}
      />
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Prioridad"
            value={select.prioridad}
            options={prioridades}
            onChange={e => {
              handleDispatch(dispatch, "prioridad", e?.value, CASO);
              handleDispatch(dispatch, "prioridad", e, "select")
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Estado"
            value={select.estado}
            options={estados}
            onChange={e => {
              handleDispatch(dispatch, "estado", e?.value, CASO);
              handleDispatch(dispatch, "estado", e, "select")
            }}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Tipo"
            value={select.tipo}
            options={tipos}
            onChange={e => {
              handleDispatch(dispatch, "tipo", e?.value, CASO);
              handleDispatch(dispatch, "tipo", e, "select")
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Origen"
            value={select?.origen}
            options={origenes}
            onChange={e => {
              handleDispatch(dispatch, "origen", e?.value, CASO);
              handleDispatch(dispatch, "origen", e, "select")
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
            disabled={caso?.contacto_id ? true : false}
            onChange={e => {
              handleDispatch(dispatch, "lead_id", e?.value, CASO);
              handleDispatch(dispatch, "lead", e, "select")
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Contacto"
            options={opcionesContactos}
            value={select.contacto}
            disabled={caso?.lead_id ? true : false}
            onChange={e => {
              handleDispatch(dispatch, "contacto_id", e?.value, CASO);
              handleDispatch(dispatch, "contacto", e, "select")
            }}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column is-half">
          <Dropdown
            label="Usuario Asignado"
            value={select.usu_asignado}
            options={opcionesUsuarios}
            onChange={e => {
              handleDispatch(dispatch, "usu_asignado_id", e?.value, CASO);
              handleDispatch(dispatch, "usu_asignado", e, "select")
            }}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <TextArea
            label="Descripción"
            name="descripcion"
            value={caso?.descripcion || ""}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, CASO)}
          />
        </div>
        <div className="column">
          <TextArea
            label="Solución"
            name="solucion"
            value={caso?.solucion || ""}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, CASO)}
          />
        </div>
      </div>

    </Seccion>
  );
};

const EditarCaso = () => {
  const { state: { caso, select }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const [enabled, setEnabled] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: currentCaso,
    isFetching,
  } = useQuery(["caso", id], () => getCaso(id));

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  useEffect(() => {
    if (!isFetching && enabled) {
      setEnabled(false);
      handleDispatchEdit(dispatch, currentCaso, CASO);
      handleDispatchEdit(dispatch, {
        estado: { label: currentCaso.estado, value: currentCaso.estado },
        origen: { label: currentCaso.origen, value: currentCaso.origen },
        prioridad: { label: currentCaso.prioridad, value: currentCaso.prioridad },
        tipo: { label: currentCaso.tipo, value: currentCaso.tipo },
        usu_asignado: currentCaso.usu_asignado_id ? 
          { label: currentCaso.usuario?.nom_usuario, value: currentCaso.usuario?.usuario_id } : "",
        lead: currentCaso.lead ?
          { value: currentCaso.lead?.lead_id, label: `${currentCaso.lead?.lead_id}-${currentCaso.lead?.persona.nombre}` } : "",
        contacto: currentCaso.contacto ?
          { value: currentCaso.contacto?.contacto_id, label: `${currentCaso.contacto?.contacto_id}-${currentCaso.contacto?.persona.nombre}` } : "",
      }, "select");
    }
  }, [isFetching]);

  const editar = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await editCaso(caso.caso_id, { ...caso });
      setAction({ saving: false, error: false, message: "Caso editado exitosamente." });
      setTimeout(() => navigate("/soporte/casos"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      {isFetching ?
        <CircularProgress size={24} className="fixed top-1/2 left-1/2" /> : <section className="section w-full m-auto">
          <Titulo1>
            Editar Caso
          </Titulo1>
          {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
          <form>
            <DatosCaso
              caso={caso}
              dispatch={dispatch}
              select={select}
            />
            <Guardar
              saving={action.saving}
              guardar={editar}
            />
            <Volver
              navigate={navigate}
            />
          </form>
        </section>}
    </div>
  )
};

export default EditarCaso;