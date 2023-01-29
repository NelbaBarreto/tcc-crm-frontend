/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import CrearPersona from "../../personas/CrearPersona";
import useToken from "../../../utils/useToken";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown } from "../../formulario/Componentes";
import { getUsuarios } from "../../../api/usuarios";
import { getCursos } from "../../../api/cursos";
import { getCampanas } from "../../../api/campanas";
import { createLead, getEstados, getOrigenes } from "../../../api/leads";
import { handleDispatch, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const LEAD = "lead";

const DatosLead = ({ select, dispatch }) => {
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
  } = useQuery(["estados"], getEstados);

  const {
    data: origenes,
  } = useQuery(["origenes"], getOrigenes);

  const opcionesUsuarios = usuariosLoading || !usuarios ? [] :
    usuarios.map(usuario => ({ value: usuario.usuario_id, label: usuario.nom_usuario }));

  const opcionesCampanas = campanasLoading || !campanas ? [] :
    campanas.map(campana => ({ value: campana.campana_id, label: campana.nombre }));

  const opcionesCursos = cursosLoading || !cursos ? [] :
    cursos.map(curso => ({ value: curso.curso_id, label: curso.nombre }));

  return (
    <Seccion titulo="Datos del Lead">
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Estado"
            value={select.estado}
            options={estados}
            onChange={e => {
              handleDispatch(dispatch, "estado", e?.value, LEAD);
              handleDispatch(dispatch, "estado", e, "select")
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Origen"
            value={select.origen}
            options={origenes}
            onChange={e => {
              handleDispatch(dispatch, "origen", e?.value, LEAD);
              handleDispatch(dispatch, "origen", e, "select")
            }}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Campaña"
            value={select.campana}
            options={opcionesCampanas}
            onChange={e => {
              handleDispatch(dispatch, "campana_id", e?.value, LEAD);
              handleDispatch(dispatch, "campana", e, "select")
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Usuario Asignado"
            value={select.usu_asignado}
            options={opcionesUsuarios}
            onChange={e => {
              handleDispatch(dispatch, "usu_asignado_id", e?.value, LEAD);
              handleDispatch(dispatch, "usu_asignado", e, "select")
            }}
          />
        </div>
      </div>
      <Dropdown
        label="Curso/Interés"
        value={select.curso}
        options={opcionesCursos}
        onChange={e => {
          handleDispatch(dispatch, "curso_id", e?.value, LEAD);
          handleDispatch(dispatch, "curso", e, "select");
        }}
      />
    </Seccion>
  );
};

const CrearLead = () => {
  const { state: { lead, persona, direcciones, select }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const navigate = useNavigate();
  const currentUser = useToken().usuario;

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    const auditoria = { usu_insercion: currentUser.nom_usuario, usu_modificacion: currentUser.nom_usuario };

    try {
      await createLead({
        ...lead,
        ...auditoria,
        persona: { ...persona, direcciones, ...auditoria }
      });
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
          <CrearPersona />
          <DatosLead
            lead={lead}
            select={select}
            dispatch={dispatch}
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

export default CrearLead;