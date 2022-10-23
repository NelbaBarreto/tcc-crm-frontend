import React, { useState, useReducer } from "react";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { createMotivo } from "../../../api/motivos";
import { reducer } from "../../formulario/reducerFormularios.js";
import { useNavigate } from "react-router-dom";

const DatosMotivo = ({onChange}) => {
  return (
    <Seccion titulo="Datos del Motivo">
      <div className="columns is-desktop">
        <div className="column">
          <div className="field">
            <label className="label">Asunto</label>
            <div className="control">
              <input
                name="motCaso"
                className="input shadow-lg"
                type="text"
                placeholder="Ingrese el motivo del caso"
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Codigo del Caso</label>
            <div className="control">
              <input
                name="codCaso"
                className="input shadow-lg"
                type="number"
                placeholder="Ingrese el codigo del caso"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label">Descripción del Caso</label>
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

const CrearMotivo = () => {
  const [state, dispatch] = useReducer(reducer, {});
  const [action, setAction] = useState({});
  const navigate = useNavigate();

  const handleDispatch = (e, name, value = " ") => {
    dispatch({
      type: "FORM_UPDATED",
      payload: { name: e?.target?.name || name, value: e?.target?.value || value, object: "motivo" }
    })
  }

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createMotivo({ ...state.persona });
      setAction({ saving: false, error: false, message: "Motivo creado exitosamente." });
      setTimeout(() => navigate("/parametros"), 3000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nuevo Motivo del caso
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <DatosMotivo caso={state.motivo} onChange={handleDispatch} />
          <Guardar saving={action.saving} guardar={crear} />
          <Volver navigate={navigate} />
        </form>
      </section>
    </div>
  )
};

export default CrearMotivo;