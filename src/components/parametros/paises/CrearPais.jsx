import React, { useState } from "react";
import Volver from "../../formulario/Volver";
import Guardar from "../../formulario/Guardar";
import { useNavigate } from "react-router-dom";
import { createPais } from "../../../api/paises";

const CrearPais = () => {
  const [pais, setPais] = useState({});
  const navigate = useNavigate();

  const crear = async e => {
    e.preventDefault();
    await createPais(pais);
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Nuevo País</h1>
        <form>
          <div className="field">
            <label className="label">Nombre del País</label>
            <div className="control">
              <input
                name="nombre"
                className="input shadow-lg"
                type="text"
                onChange={e => setPais({ ...pais, [e.target.name]: e.target.value })}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label">Nombre Corto</label>
                <div className="control">
                  <input
                    name="nom_corto"
                    className="input shadow-lg"
                    type="text"
                    onChange={e => setPais({ ...pais, [e.target.name]: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label">Código de Teléfono</label>
                <div className="control">
                  <input
                    name="cod_telefono"
                    className="input shadow-lg"
                    type="text"
                    onChange={e => setPais({ ...pais, [e.target.name]: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
          <Guardar guardar={crear} />
        </form>
        <Volver navigate={navigate} />
      </section>
    </div>
  )
};

export default CrearPais;