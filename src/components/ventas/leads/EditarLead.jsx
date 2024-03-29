/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import EditarPersona from "../../personas/EditarPersona";
import Alert from "./Alert";
import useToken from "../../../utils/useToken";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { classNameButton2, Dropdown } from "../../formulario/Componentes";
import { getUsuarios } from "../../../api/usuarios";
import { getCursos } from "../../../api/cursos";
import { getCampanas } from "../../../api/campanas";
import { editLead, getLead, getEstados, getOrigenes } from "../../../api/leads";
import { handleDispatch, handleStateCleared, handleDispatchEdit } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const LEAD = "lead";

const DatosLead = ({ dispatch, select = {}, currentLead = {} }) => {
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
            disabled={currentLead.estado === "Convertido" || currentLead.estado === "Perdido" || currentLead.estado === "Anulado"}
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
            disabled={currentLead.estado === "Convertido" || currentLead.estado === "Perdido" || currentLead.estado === "Anulado"}
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
            disabled={currentLead.estado === "Convertido" || currentLead.estado === "Perdido" || currentLead.estado === "Anulado"}
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
            disabled={currentLead.estado === "Convertido" || currentLead.estado === "Perdido" || currentLead.estado === "Anulado"}
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
        disabled={currentLead.estado === "Convertido" || currentLead.estado === "Perdido" || currentLead.estado === "Anulado"}
        onChange={e => {
          handleDispatch(dispatch, "curso_id", e?.value, LEAD);
          handleDispatch(dispatch, "curso", e, "select")
        }}
      />
    </Seccion>
  );
};

const EditarLead = () => {
  const { state: { lead, persona, direcciones, telefonos, select }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const [enabled, setEnabled] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useToken().usuario;

  const {
    data: currentLead,
    isFetching,
  } = useQuery(["lead", id], () => getLead(id));

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  useEffect(() => {
    if (!isFetching && enabled) {
      setEnabled(false);
      handleDispatchEdit(dispatch, currentLead, LEAD);
      handleDispatchEdit(dispatch, currentLead.persona, "persona");
      handleDispatchEdit(dispatch, currentLead.persona.telefonos, "telefonos");
      handleDispatchEdit(dispatch, currentLead.persona.direcciones, "direcciones");
      handleDispatchEdit(dispatch, {
        estado: { label: currentLead.estado, value: currentLead.estado },
        origen: { label: currentLead.origen, value: currentLead.origen },
        campana: currentLead.campana ?
          { label: currentLead.campana?.nombre, value: currentLead.campana?.campana_id } : "",
        usu_asignado: { label: currentLead.usu_asignado?.nom_usuario, value: currentLead.usu_asignado?.usuario_id },
        curso: { label: currentLead.curso?.nombre, value: currentLead.curso?.curso_id },
        tip_documento: currentLead.persona.tip_documento ?
          { label: currentLead.persona?.tip_documento, value: currentLead.persona?.tip_documento } : "",
      }, "select");
    }
  }, [isFetching]);

  const confirmarConversionLead = e => {
    e.preventDefault();

    if (lead.estado === "Convertido" && currentLead.estado !== "Convertido") {
      setModalIsOpen(true);
    } else {
      editar();
    }
  }


  const editar = async () => {
    setAction({ saving: true, error: false, message: "" });
    const auditoria = { fec_modificacion: new Date(), usu_modificacion: currentUser.nom_usuario };

    try {
      await editLead(id, {
        ...lead,
        ...auditoria,
        persona: { ...persona, direcciones, telefonos, ...auditoria }
      });
      setAction({ saving: false, error: false, message: "Lead editado exitosamente." });
      setTimeout(() => navigate("/ventas/leads"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Editar Lead
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <button 
            className={classNameButton2}
            onClick={e => {e.preventDefault(); setModalIsOpen(true)}}
          >
            <span>Convertir Lead</span>
            <span className="icon is-small">
              <FontAwesomeIcon icon={solid("arrows-rotate")} />
            </span>
          </button>
          <Alert
            manageModal={{ modalIsOpen, setModalIsOpen }}
          />
          <EditarPersona />
          <DatosLead
            currentLead={currentLead}
            lead={lead}
            select={select}
            dispatch={dispatch}
          />
          <Guardar
            saving={action.saving}
            guardar={confirmarConversionLead}
          />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default EditarLead;