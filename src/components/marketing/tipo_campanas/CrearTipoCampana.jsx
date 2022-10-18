import React, { useState, useReducer } from "react";
import Seccion from "../../formulario/Seccion";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import { Volver, Guardar } from "../../formulario/Acciones";
import { Titulo1 } from "../../formulario/Titulo";
import { createTipoCampana } from "../../../api/tip_campanas";
import { reducer } from "../../formulario/reducerFormularios.js";
import { useNavigate } from "react-router-dom";

const DatosTipoCampana = ({ onChange }) => {
  const [tipoCampana, setTipoCampana] = useState({});
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    await createTipoCampana(tipoCampana);
  };
    return (
        <Seccion titulo="Datos del Caso">
<div className="field">
            <label className="label">Nombre del Tipo Campaña</label>
            <div className="control">
              <input
                name="nombre"
                className="input shadow-lg"
                type="text"
                onChange={e => setTipoCampana({ ...tipoCampana, [e.target.name]: e.target.value })}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Activo</label>
            <div className="control">
              <input
                name="activo"
                className="checkbox shadow-lg"
                value={tipoCampana.activo || false}
                onChange={e => setTipoCampana({ ...tipoCampana, [e.target.name]: e.target.checked })}
                type="checkbox"
              />
            </div>
          </div>
          
        </Seccion>
    );
};

const CrearTipoCampana = () => {
    const [state, dispatch] = useReducer(reducer, {});
    const [action, setAction] = useState({});
    const navigate = useNavigate();

    const handleDispatch = (e, name, value = " ") => {
        dispatch({
            type: "FORM_UPDATED",
            payload: { name: e?.target?.name || name, value: e?.target?.value || value, object: "caso" }
        })
    }

    const crear = async e => {
        e.preventDefault();
        setAction({ saving: true, error: false, message: "" });
        try {
            await createTipoCampana({ ...state.persona });
            setAction({ saving: false, error: false, message: "Tipo Campaña creado exitosamente." });
            setTimeout(() => navigate("/marketing"), 3000);
        } catch (e) {
            setAction({ saving: false, error: true, message: e.message });
        };
    };

    return (
        <div>
            <section className="section w-full m-auto">
                <Titulo1>
                    Nuevo Tipo Campaña
                </Titulo1>
                {action.message ? <MostrarMensaje mensaje={action.message} error={action.error} /> : null}
                <form>
                    <DatosTipoCampana tipoCampana={state.tipoCampana} onChange={handleDispatch} />
                    <Guardar saving={action.saving} guardar={crear} />
                    <Volver navigate={navigate} />
                </form>
            </section>
        </div>
    )
};

export default CrearTipoCampana;