import React, { useState, useReducer } from "react";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import Seccion from "../../formulario/Seccion";
import { Datepicker, Input, TextArea } from "../../formulario/Componentes";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { useNavigate } from "react-router-dom";
import { createCampana } from "../../../api/campanas";
import { reducer, handleDispatch } from "../../formulario/reducerFormularios.js";

const CAMPANA = "campana";

const CrearCampana = () => {
  const [state, dispatch] = useReducer(reducer, {});
  const [action, setAction] = useState({});
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    setAction({ saving: true, error: false, message: "" });
    try {
      await createCampana(state.campana);
      setAction({ saving: false, error: false, message: "Campaña creada exitosamente." });
      setTimeout(() => navigate("/marketing/campanas"), 2000);
    } catch (e) {
      setAction({ saving: false, error: true, message: e.message });
    };
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nueva Campaña
        </Titulo1>
        {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
        <form>
          <Seccion titulo="Datos de la Campaña">
            <Input
              name="nombre"
              label="Nombre"
              value={state.campana?.nombre || ""}
              onChange={e => handleDispatch(dispatch, e.target?.name, e.target?.value, CAMPANA)}
            />
            <div className="columns">
              <div className="column">
                <Datepicker
                  label="Fecha de Inicio"
                  selected={state.campana?.fec_inicio || ""}
                  onChange={fecha => handleDispatch(dispatch, "fec_inicio", fecha, CAMPANA)}
                />
              </div>
              <div className="column">
                <Datepicker
                  label="Fecha Fin"
                  selected={state.campana?.fec_fin || ""}
                  onChange={fecha => handleDispatch(dispatch, "fec_fin", fecha, CAMPANA)}
                />
              </div>
            </div>
            <div className="column">
              <TextArea
                label="Descripción"
                name="descripcion"
                value={state.campana?.descripcion || ""}
                onChange={e => handleDispatch(dispatch, e?.target.name, e?.target.value, CAMPANA)}
              />
            </div>
          </Seccion>
          <Guardar guardar={crear} saving={action.saving} />
        </form>
        <Volver navigate={navigate} />
      </section>
    </div>
  )
};

export default CrearCampana;