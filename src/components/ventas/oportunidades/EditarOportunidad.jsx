import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { handleDispatch, handleStateCleared, handleDispatchEdit } from "../../formulario/reducerFormularios.js";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown, Input, TextArea } from "../../formulario/Componentes";
import { getUsuarios } from "../../../api/usuarios";
import { editOportunidad, getEstados, getOportunidad } from "../../../api/oportunidades";
import { getCampanas } from "../../../api/campanas";
import { getContactos } from "../../../api/contactos";
import { getCursos } from "../../../api/cursos";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import useToken from "../../../utils/useToken";

const OPORTUNIDAD = "oportunidad";

const DatosOportunidad = ({ oportunidad, dispatch, select = {}, disabled }) => {
  const {
    data: estadosOportunidades,
  } = useQuery(["estadosOportunidades"], getEstados);

  const {
    data: usuarios,
    usuariosLoading
  } = useQuery(["usuarios"], getUsuarios);

  const {
    data: campanas,
    campanasLoading
  } = useQuery(["campanas"], getCampanas);

  const {
    data: contactos,
    contactosLoading
  } = useQuery(["contactos"], getContactos);

  const {
    data: cursos,
    cursosLoading
  } = useQuery(["cursos"], getCursos);

  const opcionesUsuarios = usuariosLoading || !usuarios ? [] :
    usuarios.map(usuario => ({ value: usuario.usuario_id, label: usuario.nom_usuario }));

  const opcionesCampanas = campanasLoading || !campanas ? [] :
    campanas.map(campana => ({ value: campana.campana_id, label: campana.nombre }));

  const opcionesContactos = contactosLoading || !contactos ? [] :
    contactos.map(contacto => ({ value: contacto.contacto_id, label: contacto?.persona.nombre }));

  const opcionesCursos = cursosLoading || !cursos ? [] :
    cursos.map(curso => ({ value: curso.curso_id, label: curso.nombre }));

  return (
    <Seccion titulo="Datos de la Oportunidad">
      <div className="columns">
        <div className="column">
          <Input
            name="nombre"
            label="Nombre*"
            value={oportunidad?.nombre || ""}
            disabled={disabled}
            onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, OPORTUNIDAD)}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Contacto*"
            value={select.contacto}
            options={opcionesContactos}
            disabled={disabled}
            onChange={e => {
              handleDispatch(dispatch, "contacto_id", e?.value, OPORTUNIDAD);
              handleDispatch(dispatch, "contacto", e, "select")
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Curso/Interés*"
            value={select.curso}
            options={opcionesCursos}
            disabled={disabled}
            onChange={e => {
              handleDispatch(dispatch, "curso_id", e?.value, OPORTUNIDAD);
              handleDispatch(dispatch, "curso", e, "select")
            }}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Estado*"
            value={select?.estado}
            options={estadosOportunidades || []}
            disabled={disabled}
            onChange={e => {
              handleDispatch(dispatch, "estado", e?.value, OPORTUNIDAD);
              handleDispatch(dispatch, "estado", e, "select")
            }}
          />
        </div>
        <div className="column">
          <Input
            name="valor"
            label="Valor"
            type="number"
            disabled={disabled}
            value={oportunidad?.valor || ""}
            onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, OPORTUNIDAD)}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Campaña"
            value={select.campana}
            options={opcionesCampanas}
            disabled={disabled}
            onChange={e => {
              handleDispatch(dispatch, "campana_id", e?.value, OPORTUNIDAD);
              handleDispatch(dispatch, "campana", e, "select")
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Usuario Asignado"
            value={select.usu_asignado}
            options={opcionesUsuarios}
            disabled={disabled}
            onChange={e => {
              handleDispatch(dispatch, "usu_asignado_id", e?.value, OPORTUNIDAD);
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
            value={oportunidad?.descripcion || ""}
            disabled={disabled}
            onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, OPORTUNIDAD)}
          />
        </div>
      </div>
    </Seccion>
  );
};

const EditarOportunidad = () => {
  const { state: { oportunidad, select }, dispatch } = useContext(AppContext);
  const [action, setAction] = useState({});
  const [enabled, setEnabled] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useToken().usuario;

  const {
    data: currentOportunidad,
    isFetching,
  } = useQuery(["oportunidad", id], () => getOportunidad(id));

  useEffect(() => {
    handleStateCleared(dispatch);
  }, []);

  useEffect(() => {
    if (!isFetching && enabled) {
      setEnabled(false);
      handleDispatchEdit(dispatch, currentOportunidad, OPORTUNIDAD);
      handleDispatchEdit(dispatch, {
        estado: { label: currentOportunidad.estado, value: currentOportunidad.estado },
        campana: currentOportunidad.campana_id ? { label: currentOportunidad.campana?.nombre, value: currentOportunidad.campana?.campana_id } : "",
        curso: { label: currentOportunidad.curso?.nombre, value: currentOportunidad.curso?.curso_id },
        usu_asignado: { label: currentOportunidad.usuario?.nom_usuario, value: currentOportunidad.usuario?.usuario_id },
        contacto: { label: currentOportunidad.contacto?.persona?.nombre, value: currentOportunidad.contacto?.contacto_id }
      }, "select");
    }
  }, [isFetching]);

  const editar = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    const auditoria = { fec_modificacion: new Date(), usu_modificacion: currentUser.nom_usuario };

    try {
      await editOportunidad(oportunidad.oportunidad_id, { ...oportunidad, ...auditoria });
      setAction({ saving: false, error: false, message: "Oportunidad guardada exitosamente." });
      setTimeout(() => navigate("/ventas/oportunidades"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Editar Oportunidad
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <DatosOportunidad
            oportunidad={oportunidad}
            disabled={currentOportunidad?.estado === "Ganado"}
            dispatch={dispatch}
            select={select}
          />
          <Guardar 
            saving={action.saving} 
            guardar={editar} 
          />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default EditarOportunidad;