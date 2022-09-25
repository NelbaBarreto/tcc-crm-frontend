import React, { useState } from "react";
import { Volver, Guardar } from "../../formulario/Acciones";
import { useNavigate } from "react-router-dom";
import { createTipoCampana } from "../../../api/tip_campanas";

const CrearTipoCampana = () => {
  const [tipoCampana, setTipoCampana] = useState({});
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    await createTipoCampana(tipoCampana);
  };
  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Nuevo Tipo Campaña</h1>
        <form>
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
          <Guardar guardar={crear} />
        </form>
        <Volver navigate={navigate} />
      </section>
    </div>
  )
};

export default CrearTipoCampana;