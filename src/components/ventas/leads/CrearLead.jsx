import React, { useState, useReducer } from "react";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import CrearPersona from "../../personas/CrearPersona";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown } from "../../formulario/Componentes";
import { getUsuarios } from "../../../api/usuarios";
import { getCursos } from "../../../api/cursos";
import { getCampanas } from "../../../api/campanas";
import { createLead, getEstados, getOrigenes } from "../../../api/leads";
import { reducer } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const DatosLead = ({ onChange }) => {
  const [select, setSelect] = useState({
    estado: "", origen: "", campana: "",
    usu_asignado: "", curso: ""
  });

  const {
    data: usuarios,
    usuariosLoading
  } = useQuery(["usuarios"], getUsuarios);

  const {
    data: campanas,
    campanasLoading
  } = useQuery(["campanas"], getCampanas);

  const {
    data: cursos,
    cursosLoading
  } = useQuery(["cursos"], getCursos);

  const {
    data: estados,
    estadosLoading
  } = useQuery(["estados"], getEstados);

  const {
    data: origenes,
    origenesLoading
  } = useQuery(["origenes"], getOrigenes);

  const opcionesUsuarios = usuariosLoading || !usuarios ? [] :
    usuarios.map(usuario => ({ value: usuario.usuario_id, label: usuario.nom_usuario }));

  const opcionesCampanas = campanasLoading || !campanas ? [] :
    campanas.map(campana => ({ value: campana.campana_id, label: campana.nombre }));

  const opcionesCursos = cursosLoading || !cursos ? [] :
    cursos.map(curso => ({ value: curso.curso_id, label: curso.nombre }));

  const opcionesEstado = estadosLoading || !estados ? [] :
    estados.map(estado => ({ value: estado, label: estado }));

  const opcionesOrigen = origenesLoading || !origenes ? [] :
    origenes.map(origen => ({ value: origen, label: origen }));

  return (
    <Seccion titulo="Datos del Lead">
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Estado"
            value={select.estado}
            options={opcionesEstado}
            onChange={e => { onChange(e, "estado", e?.value); setSelect({ ...select, estado: e }) }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Origen"
            value={select.origen}
            options={opcionesOrigen}
            onChange={e => { onChange(e, "origen", e?.value); setSelect({ ...select, origen: e }) }}
          />
        </div>
      </div>
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
            label="Usuario Asignado"
            value={select.usu_asignado}
            options={opcionesUsuarios}
            onChange={e => { onChange(e, "usu_asignado_id", e?.value); setSelect({ ...select, usu_asignado: e }) }}
          />
        </div>
      </div>
      <Dropdown
        label="Curso/Interés"
        value={select.curso_id}
        options={opcionesCursos}
        onChange={e => { onChange(e, "curso_id", e?.value); setSelect({ ...select, curso_id: e }) }}
      />
    </Seccion>
  );
};

const CrearLead = () => {
  const [state, dispatch] = useReducer(reducer, {});
  const [persona, setPersona] = useState({});
  const [action, setAction] = useState({});
  const navigate = useNavigate();

  const handleDispatch = (e, name, value = " ") => {
    dispatch({
      type: "FORM_UPDATED",
      payload: { name: e?.target?.name || name, value: e?.target?.value || value, object: "lead" }
    })
  }

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createLead({ ...state.lead, persona });
      setAction({ saving: false, error: false, message: "Lead creado exitosamente." });
      setTimeout(() => navigate("/ventas/leads"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Lead
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <CrearPersona persona={persona} setPersona={setPersona} />
          <DatosLead lead={state.lead} onChange={handleDispatch} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearLead;