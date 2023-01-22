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
import { editLead, getLead, getEstados, getOrigenes } from "../../../api/leads";
import { handleDispatch, handleStateCleared, handleDispatchEdit } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";

const LEAD = "lead";

const DatosLead = ({ dispatch, manageSelect }) => {
  const { setSelect, select } = manageSelect;
  
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

  useEffect(() => {
    if (estados) {
      setSelect({ ...select, estado: { label: estados[0], value: estados[0] } });
    }
  }, [estados]);

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
            onChange={e => {
              handleDispatch(dispatch, "estado", e?.value, LEAD);
              setSelect({ ...select, estado: e })
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Origen"
            value={select.origen}
            options={opcionesOrigen}
            onChange={e => {
              handleDispatch(dispatch, "origen", e?.value, LEAD);
              setSelect({ ...select, origen: e })
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
              setSelect({ ...select, campana: e })
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
              setSelect({ ...select, usu_asignado: e })
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
          setSelect({ ...select, curso: e })
        }}
      />
    </Seccion>
  );
};

const EditarCaso = () => {
  const { state: { lead, persona, direcciones }, dispatch } = useContext(AppContext);
  const [select, setSelect] = useState({ estado: "", origen: "", usu_asignado: "", prioridad: "" });
  const [action, setAction] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useToken().usuario;

  const {
    data: currentLead,
    isFetching,
  } = useQuery(["lead", id], () => getLead(id));

  useEffect(() => {
    handleStateCleared(dispatch);
    setSelect({ estado: "", origen: "", usu_asignado: "", prioridad: "" });
  }, []);

  useEffect(() => {
    if (!isFetching) {
      handleDispatchEdit(dispatch, currentLead, LEAD);
      setSelect({
        estado: { label: currentLead.estado, value: currentLead.estado },
        origen: { label: currentLead.origen, value: currentLead.origen },
        campana: { label: currentLead.campana?.nombre, value: currentLead.campana?.campana_id },
        usu_asignado: { label: currentLead.usu_asignado?.nom_usuario, value: currentLead.usu_asignado?.usuario_id },
        curso: { label: currentLead.curso?.nombre, value: currentLead.curso?.curso_id }
      });
    }
  }, [isFetching]);

  const editar = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    const auditoria = { fec_modificacion: new Date(), usu_modificacion: currentUser.nom_usuario };

    try {
      await editLead({
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
            manageSelect={{ setSelect, select }}
            dispatch={dispatch}
          />
          <Guardar saving={action.saving} guardar={editar} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default EditarCaso;