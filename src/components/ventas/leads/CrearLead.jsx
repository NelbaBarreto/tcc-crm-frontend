import React, { useState, useContext } from "react";
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
import { handleDispatch } from "../../formulario/reducerFormularios.js";
import AppContext from "../../../utils/AppContext";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const LEAD = "lead";

const DatosLead = ({ dispatch }) => {
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
              handleDispatch(dispatch, "usuario_asignado_id", e?.value, LEAD);
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

const CrearLead = () => {
  const {state, dispatch} = useContext(AppContext);
  const [action, setAction] = useState({});
  const navigate = useNavigate();
console.log(state)
  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createLead({ ...state.lead, persona: state.persona });
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
          <DatosLead lead={state.lead} dispatch={dispatch} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearLead;