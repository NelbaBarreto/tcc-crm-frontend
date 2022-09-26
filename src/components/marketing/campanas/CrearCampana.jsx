import React, { useState } from "react";
import MostrarMensaje from "../../formulario/MostrarMensaje";
import Seccion from "../../formulario/Seccion";
import { Volver, Guardar } from "../../formulario/Acciones";
import { useNavigate } from "react-router-dom";
import { createCampana } from "../../../api/campanas";
import { Titulo1 } from "../../formulario/Titulo";

const CrearCampana = () => {
  const [campana, setCampana] = useState({});
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    setState({ saving: true, error: false, message: "" });
    try {
      await createCampana(campana);
      setState({ saving: false, error: false, message: "Campaña creada exitosamente." });
      setTimeout(() => navigate("/marketing/campanas"), 3000);
    } catch (e) {
      setState({ saving: false, error: true, message: e.message });
    };
  };


  return (
    <div>
      <section className="section w-full m-auto">
        <Titulo1>
          Nueva Campaña
        </Titulo1>
        {state.message ? <MostrarMensaje mensaje={state.message} error={state.error} /> : null}
        <form>
          <Seccion titulo="Datos de la Campaña">
            <div className="field">
              <label className="label">Nombre</label>
              <div className="control">
                <input
                  name="nombre"
                  className="input shadow-lg"
                  type="text"
                  onChange={e => setCampana({ ...campana, [e.target.name]: e.target.value })}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Fecha de Inicio</label>
              <div className="control">
                <input
                  name="fec_inicio"
                  className="input shadow-lg"
                  type="date"
                  onChange={e => setCampana({ ...campana, [e.target.name]: e.target.value })}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Fecha de Fin</label>
              <div className="control">
                <input
                  name="fec_fin"
                  className="input shadow-lg"
                  type="date"
                  onChange={e => setCampana({ ...campana, [e.target.name]: e.target.value })}
                />
              </div>
            </div>
          </Seccion>
          <Guardar guardar={crear} saving={state.saving} />
        </form>
        <Volver navigate={navigate} />
      </section>
    </div>
  )
};

export default CrearCampana;