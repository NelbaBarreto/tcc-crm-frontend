import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../utils/AppContext";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { handleDispatch, handleStateCleared } from "../../formulario/reducerFormularios.js";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown, Input, TextArea } from "../../formulario/Componentes";
import { getUsuarios } from "../../../api/usuarios";
import { createOportunidad, getEtapas } from "../../../api/oportunidades";
import { getCampanas } from "../../../api/campanas";
import { getContactos } from "../../../api/contactos";
import { getCursos } from "../../../api/cursos";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import useToken from "../../../utils/useToken";

const OPORTUNIDAD = "oportunidad";

const DatosOportunidad = ({ oportunidad, dispatch }) => {
  const [select, setSelect] = useState({ etapa: "", usu_asignado: "" });

  const {
    data: etapasOportunidades,
    etapasLoading
  } = useQuery(["etapasOportunidades"], getEtapas);

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

  const opcionesEtapas = etapasLoading || !etapasOportunidades ? [] :
    etapasOportunidades.map(etapa => ({ value: etapa, label: etapa }));

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
            onChange={e => {
              handleDispatch(dispatch, "contacto_id", e?.value, OPORTUNIDAD);
              setSelect({ ...select, contacto: e })
            }}
          />
        </div>
        <div className="column">
          <Dropdown
            label="Curso/Interés*"
            value={select.curso}
            options={opcionesCursos}
            onChange={e => {
              handleDispatch(dispatch, "curso_id", e?.value, OPORTUNIDAD);
              setSelect({ ...select, curso: e })
            }}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Dropdown
            label="Etapa*"
            value={select.etapa}
            options={opcionesEtapas}
            onChange={e => {
              handleDispatch(dispatch, "etapa", e?.value, OPORTUNIDAD);
              setSelect({ ...select, etapa: e })
            }}
          />
        </div>
        <div className="column">
          <Input
            name="valor"
            label="Valor"
            type="number"
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
            onChange={e => {
              handleDispatch(dispatch, "campana_id", e?.value, OPORTUNIDAD);
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
              handleDispatch(dispatch, "usu_asignado_id", e?.value, OPORTUNIDAD);
              setSelect({ ...select, usu_asignado: e })
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
            onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, OPORTUNIDAD)}
          />
        </div>
      </div>
    </Seccion>
  );
};

const CrearOportunidad = () => {
  const { state: { oportunidad }, dispatch } = useContext(AppContext);
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
      await createOportunidad({
        ...oportunidad,
        ...auditoria
      });
      setAction({ saving: false, error: false, message: "Oportunidad creada exitosamente." });
      setTimeout(() => navigate("/ventas/oportunidades"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nueva Oportunidad
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <DatosOportunidad
            oportunidad={oportunidad}
            dispatch={dispatch}
          />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearOportunidad;