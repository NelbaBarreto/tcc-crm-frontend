import React, { useState } from "react";
import Select from "react-select";
import { Titulo2 } from "../formulario/Titulo";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Persona = ({ persona, setPersona }) => {
  const options = [
    { value: "CI", label: "CI" },
    { value: "RUC", label: "RUC" },
    { value: "Pasaporte", label: "Pasaporte" }
  ];
  const [tip_documento, setTipDocumento] = useState("");

  return (
    <section className="bg-white p-4 rounded-md shadow-lg mt-2">
      <Titulo2>Datos Personales</Titulo2>
      <div className="field">
        <label className="label">Nombre</label>
        <div className="control">
          <input
            name="nombre"
            className="input shadow-lg"
            value={persona.nombre || ""}
            onChange={e => setPersona({ ...persona, [e.target.name]: e.target.value })}
            type="text"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            name="email"
            className="input shadow-lg"
            value={persona.email || ""}
            onChange={e => setPersona({ ...persona, [e.target.name]: e.target.value, empleado: { ...persona.empleado, usuario: { ...persona.empleado.usuario, [e.target.name]: e.target.value } } })}
            type="email"
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">Número de Documento</label>
            <div className="control">
              <input
                name="nro_documento"
                className="input shadow-lg"
                value={persona.nro_documento || ""}
                onChange={e => setPersona({ ...persona, [e.target.name]: e.target.value })}
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <label className="label">Tipo de Documento</label>
            <div className="control">
              <Select
                name="tip_documento"
                className="shadow-lg"
                placeholder=""
                onChange={e => { setPersona({ ...persona, tip_documento: e.value }); setTipDocumento(e) }}
                value={tip_documento}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Direcciones = () => {
  return (
    <section className="bg-white p-4 rounded-md shadow-lg mt-2">
      <Titulo2>Direcciones</Titulo2>
      <button className="button font-semibold shadow-lg text-white hover:text-white focus:text-white
              hover:bg-deep-purple-700 bg-deep-purple-400 border-deep-purple-700 mb-2"
      >
        <span>Agregar Dirección</span>
        <span className="icon is-small">
          <FontAwesomeIcon icon={solid("plus")} />
        </span>
      </button>
    </section>
  );
}

const CrearPersona = ({ persona, setPersona }) => {
  return (
    <section>
      <Persona persona={persona} setPersona={setPersona} />
      <Direcciones />
    </section>
  );
}

export default CrearPersona;