import React, { useState } from "react";
import Volver from "../../Volver";
import Guardar from "../../Guardar";
import { useNavigate } from "react-router-dom";
import { createCampana } from "../../../api/campanas";

const CrearCampana = () => {
  const [campana, setCampana] = useState({});
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    await createCampana(campana);
  };

  console.log(campana);

  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Nueva Campaña</h1>
        <form>
          <div className="field">
            <label className="label">Nombre de la Campaña</label>
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
            <label className="label">Tipo Campaña</label>
            <div className="control">
              <input
                name="tip_campana_id"
                className="input shadow-lg"
                type="number"
                onChange={e => setCampana({ ...campana, [e.target.name]: e.target.value })}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Fecha Inicio</label>
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
            <label className="label">Fecha Fin</label>
            <div className="control">
              <input
                name="fec_fin"
                className="input shadow-lg"
                type="date"
                onChange={e => setCampana({ ...campana, [e.target.name]: e.target.value })}
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

export default CrearCampana;