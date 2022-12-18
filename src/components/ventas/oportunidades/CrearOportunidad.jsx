import React, { useState, useReducer } from "react";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { Dropdown } from "../../formulario/Componentes";
import { getUsuarios } from "../../../api/usuarios";
import { getCampanas } from "../../../api/campanas";
import { createOportunidad, getEtapas } from "../../../api/oportunidades";
import { reducer } from "../../formulario/reducerFormularios.js";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const DatosOportunidad = ({ onChange }) => {

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
    <Seccion titulo="Datos de la Oportunidad">
      <div className="columns is-desktop">
        <div className="column">
          <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input
                name="nombre"
                className="input shadow-lg"
                type="number"
                placeholder="Ingrese el nombre de la Oportunidad"
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Etapa: </label>
            <div className="control">
              <div className="select">
                <select>
                  <option>Asignado</option>
                  <option>Pendiente</option>
                  <option>Confirmado</option>
                  <option>Anulado</option>
                </select>
              </div>
            </div>
          </div>
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

      <div className="columns is-desktop">
        <div className="column">
          <div className="field">
            <label className="label">Valor</label>
            <div className="control">
              <input
                name="valor"
                className="input shadow-lg"
                type="text"
                placeholder="Ingrese el valor de la Oportunidad"
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Descripción</label>
            <div className="control">
              <textarea
                name="desCaso"
                className="textarea"
                type="text"
                placeholder="Ingrese una descripción"
              />
            </div>
          </div>
        </div>
      </div>

    </Seccion>
  );
};

const CrearOportunidad = () => {
  const [state, dispatch] = useReducer(reducer, {});
  const [action, setAction] = useState({});
  const navigate = useNavigate();

  const handleDispatch = (e, name, value = " ") => {
    dispatch({
      type: "FORM_UPDATED",
      payload: { name: e?.target?.name || name, value: e?.target?.value || value, object: "oportunidad" }
    })
  }

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createOportunidad({ ...state.lead });
      setAction({ saving: false, error: false, message: "Oportunidad creada exitosamente." });
      setTimeout(() => navigate("/ventas/oportunidades"), 3000);
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
          <DatosOportunidad lead={state.lead} onChange={handleDispatch} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearOportunidad;