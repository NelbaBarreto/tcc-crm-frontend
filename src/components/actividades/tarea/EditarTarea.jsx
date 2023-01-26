/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown, Input, TextArea, Datepicker } from "../../formulario/Componentes";
import { getUsuarios } from "../../../api/usuarios";
import { editTarea, getPrioridades, getEstados, getTarea } from "../../../api/tareas";
import { handleDispatch, handleDispatchEdit, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const TAREA = "tarea";

const DatosTarea = ({ tarea, dispatch, select = {} }) => {
  const {
    data: usuarios,
    usuariosLoading
  } = useQuery(["usuarios"], getUsuarios);

  const {
    data: prioridades,
  } = useQuery(["prioridades"], getPrioridades);

  const {
    data: estados,
  } = useQuery(["estados"], getEstados);

  const opcionesUsuarios = usuariosLoading || !usuarios ? [] :
    usuarios.map(usuario => ({ value: usuario.usuario_id, label: usuario.nom_usuario }));

  return (
    <Seccion titulo="Datos de la Tarea">
      <div className="columns is-desktop">
        <div className="column">
          <Input
            label="Asunto"
            name="asunto"
            value={tarea?.asunto || ""}
            onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, TAREA)}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Estado"
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
            label="Usuario Asignado"
            value={select.usuario}
            options={opcionesUsuarios}
            onChange={e => {
              handleDispatch(dispatch, "usu_asignado_id", e?.value, TAREA);
              handleDispatch(dispatch, "usuario", e, "select")
            }}
          />
        </div>

        <div className="column">
          <Dropdown
            label="Prioridad"
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
        label="Descripción"
        name="descripcion"
        value={tarea?.descripcion || ""}
        onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, TAREA)}
      />
    </Seccion >
  );
};

const EditarTarea = () => {
  const { state: { tarea, select }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: currentTarea,
    isFetching,
  } = useQuery(["tarea", id], () => getTarea(id));

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  useEffect(() => {
    if (!isFetching) {
      handleDispatchEdit(dispatch, currentTarea, TAREA);
      handleDispatchEdit(dispatch, {
        estado: { label: currentTarea.estado, value: currentTarea.estado },
        prioridad: { label: currentTarea.prioridad, value: currentTarea.prioridad },
        usuario: currentTarea.usuario ?
          { label: currentTarea.usuario?.nom_usuario, value: currentTarea.usuario?.usuario_id } : "",
        lead: currentTarea.contacto ?
          { value: currentTarea.lead?.lead_id, label: `${currentTarea.lead?.lead_id}-${currentTarea.lead?.persona.nombre}` } : "",
        contacto: currentTarea.contacto ?
          { value: currentTarea.contacto?.contacto_id, label: `${currentTarea.contacto?.contacto_id}-${currentTarea.contacto?.persona.nombre}` } : "",
      }, "select");
    }
  }, [isFetching]);

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await editTarea(tarea.tarea_id, { ...tarea });
      setAction({ saving: false, error: false, message: "Tarea editada exitosamente." });
      setTimeout(() => navigate("/actividades/tareas"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Editar Tarea
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
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default EditarTarea;