import React, { useState } from "react";
import Volver from "../../Volver";
import Select from "react-select";
import Guardar from "../../Guardar";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { createCiudad } from "../../../api/ciudades";
import { getPaises } from "../../../api/paises";

const CrearCiudad = () => {
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState({});
  const navigate = useNavigate();

  const {
    data: paises,
    isLoading
  } = useQuery(["paises"], getPaises);

  const options = isLoading ? [] : paises.map(pais => ({ value: pais.pais_id, label: pais.nombre }));

  const crear = async e => {
    e.preventDefault();
    await createCiudad(ciudad);
  };

  return (
    <div>
      <section className="section w-full m-auto">
        <h1 className="title is-3 text-center">Nueva Ciudad</h1>
        <form>
          <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input
                name="nombre"
                className="input shadow-lg"
                type="text"
                value={ciudad.nombre || ""}
                onChange={e => setCiudad({ ...ciudad, [e.target.name]: e.target.value })}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">País</label>
            <div className="control">
              <Select
                name="pais_id"
                className="shadow-lg"
                placeholder=""
                onChange={e => { setCiudad({ ...ciudad, pais_id: e.value }); setPais(e) }}
                value={pais}
                options={options}
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

export default CrearCiudad;