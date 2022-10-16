import React, { useState, useReducer } from "react";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import CrearPersona from "../../personas/CrearPersona";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown } from "../../formulario/Componentes";
import { getUsuarios } from "../../../api/usuarios";
import { getCampanas } from "../../../api/campanas";
import { createOrganizacion } from "../../../api/organizaciones";
import { reducer } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const DatosOrganizacion = ({ onChange }) => {
  const [select, setSelect] = useState({ estado: "", origen: "", campana: "", usu_asignado: "" });

  const {
    data: usuarios,
    usuariosLoading
  } = useQuery(["usuarios"], getUsuarios);

  const {
    data: campanas,
    campanasLoading
  } = useQuery(["campanas"], getCampanas);

  const opcionesUsuarios = usuariosLoading || !usuarios ? [] :
    usuarios.map(usuario => ({ value: usuario.usuario_id, label: usuario.nom_usuario }));

  const opcionesCampanas = campanasLoading || !campanas ? [] :
    campanas.map(campana => ({ value: campana.campana_id, label: campana.nombre }));

  return (
    <Seccion titulo="Datos de la organización">

      <div className="columns is-desktop">
        <div className="column">
          <div className="field">
            <label className="label">Nombre de la Organización</label>
            <div className="control">
              <input
                name="nomOrga"
                className="input shadow-lg"
                type="text"
                placeholder="Ingrese el nombre de la organizacion"
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Website</label>
            <div className="control">
              <input
                name="website"
                className="input shadow-lg"
                type="text"
                placeholder="Ingrese el Website de la organización"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Descripción de la Organización</label>
        <div className="control">
          <textarea
            name="desCaso"
            className="textarea"
            type="text"
            placeholder="Ingrese una descripción"
          />
        </div>
      </div>

    </Seccion>
  );
};

const CrearOrganizacion = () => {
  const [state, dispatch] = useReducer(reducer, {});
  const [persona, setPersona] = useState({});
  const [action, setAction] = useState({});
  const navigate = useNavigate();

  const handleDispatch = (e, name, value = " ") => {
    dispatch({
      type: "FORM_UPDATED",
      payload: { name: e?.target?.name || name, value: e?.target?.value || value, object: "organizacion" }
    })
  }

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createOrganizacion({ ...state.persona });
      setAction({ saving: false, error: false, message: "Organización creado exitosamente." });
      setTimeout(() => navigate("/ventas/organizaciones"), 3000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nueva Organización
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <CrearPersona persona={persona} setPersona={setPersona} />
          <DatosOrganizacion lead={state.lead} onChange={handleDispatch} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearOrganizacion;