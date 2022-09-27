import React, { useState } from "react";
import Select from "react-select";
import { Eliminar } from "../formulario/Acciones";
import { useQuery } from "react-query";
import { getPaises } from "../../api/paises";

const Direccion = ({ index }) => {
  const [pais, setPais] = useState("");

  const {
    data: paises,
    isLoading
  } = useQuery(["paises"], getPaises);

  const opcionesPais = isLoading ? [] : paises.map(pais => ({ value: pais.pais_id, label: pais.nombre }));

  return (
    <section className="mb-2 p-4 border-gray-300 border-solid border">
      <span className="tag is-light float-right">Dirección #{index + 1}</span>
      <div className="field">
        <label className="label">Calle 1</label>
        <div className="control">
          <input
            name="nombre"
            className="input shadow-lg"
            type="text"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Calle 2</label>
        <div className="control">
          <input
            name="nombre"
            className="input shadow-lg"
            type="text"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Código Postal</label>
        <div className="control">
          <input
            name="nombre"
            className="input shadow-lg"
            type="text"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">País</label>
            <div className="control">
              <Select
                name="pais_id"
                className="shadow-lg"
                placeholder=""
                onChange={e => setPais(e)}
                value={pais}
                options={opcionesPais}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Ciudad</label>
            <div className="control">
              <Select
                name="ciudad_id"
                className="shadow-lg"
                placeholder=""
                options={[{ value: 1, label: "Asunción" }]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="field">
        <label className="label">Referencia</label>
        <div className="control">
          <textarea className="textarea"></textarea>
        </div>
      </div>
      <div className="field">
        <label className="label">Principal</label>
        <div className="control">
          <input
            name="principal"
            type="checkbox"
          />
        </div>
      </div>
      <Eliminar onClick={e => console.log(e)} />
    </section>
  );
}

export default Direccion;