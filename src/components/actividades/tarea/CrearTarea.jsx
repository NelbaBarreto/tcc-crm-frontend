/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown, Input, TextArea, Datepicker } from "../../formulario/Componentes";
import { getUsuarios } from "../../../api/usuarios";
import { getLeads } from "../../../api/leads";
import { getContactos } from "../../../api/contactos";
import { createTarea, getPrioridades, getEstados } from "../../../api/tareas";
import { handleDispatch, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const TAREA = "tarea";

const DatosTarea = ({ tarea, dispatch, select = {} }) => {
  const {
    data: usuarios,
    usuariosLoading
  } = useQuery(["usuarios"], getUsuarios);

  const {
    data: leads,
    leadsLoading
  } = useQuery(["leads"], getLeads);

  const {
    data: contactos,
    contactosLoading
  } = useQuery(["contactos"], getContactos);

  const {
    data: prioridades,
  } = useQuery(["prioridades"], getPrioridades);

  const {
    data: estados,
  } = useQuery(["estados"], getEstados);

  const opcionesUsuarios = usuariosLoading || !usuarios ? [] :
    usuarios.map(usuario => ({ value: usuario.usuario_id, label: usuario.nom_usuario }));

    const opcionesLeads = leadsLoading || !leads ? [] :
    leads.map(lead => ({ value: lead.lead_id, label: `${lead.lead_id}-${lead.persona.nombre}` }));

  const opcionesContactos = contactosLoading || !contactos ? [] :
    contactos.map(contacto => ({ value: contacto.contacto_id, label: `${contacto.contacto_id}-${contacto.persona.nombre}` }));

  return (
    <Seccion titulo="Datos de la Tarea">
      <div className="columns is-desktop">
        <div className="column">
          <Input
            label="Asunto*"
            name="asunto"
            value={tarea?.asunto || ""}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, TAREA)}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Estado*"
            value={select.estado}
            options={estados}
            onChange={e => {
              handleDispatch(dispatch, "estado", e?.value, TAREA);
              handleDispatch(dispatch, "estado", e, "select")
            }}
          />
        </div>
      </div>

      <div className="columns is-desktop">
        <div className="column">
          <Dropdown
            label="Usuario Asignado*"
            value={select.usu_asignado}
            options={opcionesUsuarios}
            onChange={e => {
              handleDispatch(dispatch, "usu_asignado_id", e?.value, TAREA);
              handleDispatch(dispatch, "usu_asignado", e, "select")
            }}
          />
        </div>

        <div className="column">
          <Dropdown
            label="Prioridad*"
            value={select.prioridad}
            options={prioridades}
            onChange={e => {
              handleDispatch(dispatch, "prioridad", e?.value, TAREA);
              handleDispatch(dispatch, "prioridad", e, "select")
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
            disabled={tarea?.contacto_id}
            onChange={e => {
              handleDispatch(dispatch, "lead_id", e?.value, TAREA);
              handleDispatch(dispatch, "lead", e, "select")
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Contacto"
            options={opcionesContactos}
            value={select.contacto}
            disabled={tarea?.lead_id}
            onChange={e => {
              handleDispatch(dispatch, "contacto_id", e?.value, TAREA);
              handleDispatch(dispatch, "contacto", e, "select")
            }}
          />
        </div>
      </div>
      <div className="columns is-desktop">
        <div className="column">
          <Datepicker
            label="Fecha de Inicio"
            selected={tarea?.fec_inicio || ""}
            onChange={fecha => handleDispatch(dispatch, "fec_inicio", fecha, TAREA)}
          />
        </div>
        <div className="column">
          <Datepicker
            label="Fecha Fin"
            selected={tarea?.fec_fin || ""}
            onChange={fecha => handleDispatch(dispatch, "fec_fin", fecha, TAREA)}
          />
        </div>
      </div>
      <TextArea
        label="Descripción*"
        name="descripcion"
        value={tarea?.descripcion || ""}
        onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, TAREA)}
      />
    </Seccion >
  );
};

const CrearTarea = () => {
  const { state: { tarea, select }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      const nuevaTarea = await createTarea({ ...tarea });

      if (nuevaTarea.message) {
        setAction({ saving: false, error: true, message: nuevaTarea.message });
      } else {
        setAction({ saving: false, error: false, message: "Tarea creada exitosamente." });
        setTimeout(() => navigate("/actividades/tareas"), 3000);
      }
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nueva Tarea
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <DatosTarea
            tarea={tarea}
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
      </section>
    </div>
  )
};

export default CrearTarea;